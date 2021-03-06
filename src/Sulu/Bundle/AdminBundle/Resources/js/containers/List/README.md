The `List` is responsible for rendering data in a table view. One of its properties is the `store`, which has to be
created outside, and be passed to the `List`. The `ListStore` is responsible for loading a page from a
REST API. The presentation of the `List` is handled by its adapters. An adapter is the glue which connects a basic
component like the `Table` to the `List`. The available adapters for a `List` can be set using the `views`
property. Keep in mind that an adapter has to be defined and added to the `listAdapterRegistry` before it is used 
by a rendered `List`.

```javascript static
const TableAdapter = require('./adapters/TableAdapter');
const listAdapterRegistry = require('./registries/listAdapterRegistry');
adapterStore.add('table', TableAdapter);

const store = new ListStore('snippets');

<List store={store} views={['table']} />

store.selections; // returns the selected items
store.selectionIds; // returns the IDs of the selected items
store.destroy();
```

The `List` also takes control of the store, and handles loading other pages and selecting of items. The
`selectionIds` property can be used to retrieve the IDs of the currently selected items and the `selections` property
will return the selected items themselves.

After the store is not used anymore, its `destroy` method should be called, because there are some observations, which
have to be cancelled.

The `List` component also takes an `onRowEditClick` callback, which is executed when a row has been clicked with
the intent of editing it. The callback gets one parameter, which is the ID of the row to edit.
Furthermore, the `List` allows to configure additional item specific actions via the `itemActionsProvider` callback.
The callback is executed for each item and should return an array of item-action configuration-objects. These
configuration-objects are used by the adapters to render elements to execute the respective actions for the item.

### Adapters

Sulu comes with a few adapters prebuilt:

| Adapter                   | Description                                                              |
| ------------------------- | ------------------------------------------------------------------------ |
| TableAdapter              | Integrates the [`Table`](#table) component                               |
| ColumnListAdapter         | Integrates the [`ColumnList`](#columnlist) component                     |
| FolderAdapter             | Integrates the [`FolderList`](#folderlist) component                     |
| MediaCardSelectionAdapter | Integrates the [`MediaCard`](#mediacard) component with a selection icon |
| MediaCardOverviewAdapter  | Integrates the [`MediaCard`](#mediacard) component with a edit icon      |

The adapters are only responsible for displaying the information they get passed from the list. All the other
list functionality is built into the `List` component.

However, the different adapters have slightly different requirements regarding loading and storing the data from the
server. Therefore, the adapters can define which `LoadingStrategy` and which `StructureStrategy` they are using. These
two interfaces will be explained in the next sections.

#### LoadingStrategies

The `LoadingStrategy` is only responsible for loading the data from the server. Its most important method has the
following interface:

```javascript static
load(resourceKey: string, options: LoadOptions, parentId: ?string | number)
```

The `LoadingStrategy` has a reference to the `StructureStrategy`, and therefore can use its methods like `clear` and
`addItem` to alter its data. The `resourceKey` defines for which entity the data is loaded, and is required because
the `LoadingStrategies` make use of the [`ResourceRequester` service](#resourcerequester). The `options` can contain
more parameters being added to the URL the request will be sent to, e.g. the currently active element will be added as
`parentId` automatically. Finally the optional `parentId` parameter will be passed if a nested hierarchy is supported by
the underlying `StructureStrategy`.

Sulu is delivered with a few `LoadingStrategy` implementations:

| Name                     | Description                                                        | Pagination Component                    |
| ------------------------ | ------------------------------------------------------------------ | --------------------------------------- |
| DefaultLoadingStrategy   | Can be configured to have pagination or load all available items.  | [`Pagination`](#pagination) or None                                    |
| InfiniteLoadingStrategy  | Loads the next few items and appends them to the `data` array      | [`InfiniteScroller`](#infinitescroller) |

The list also contains the recommended pagination component to use with each strategy. Make sure that the adapters you
are developing are using the correct pagination according to their `LoadingStrategy`. Note that it is the
responsibility of the adapter to display a pagination component.

#### StructureStrategies

This strategy is responsible for defining how the data in the array has to be structured. Sulu comes with three
different `StructureStrategy` implementations. The `FlatStructureStrategy` holds a simple array of objects containing the items. The `TreeStructureStrategy` is used when some kind of tree has to be built (e.g. when using the adapter for
the `tree_table`. The `ColumnStructureStrategy` holds the data for the `ColumnListAdapter` in a nested array, whereby
the first level describes the columns and the second level describes the items.

The `StructureStrategy`'s most important property is the `data` property, which returns the underlying data.

Furthermore the `StructureStrategy` has to define a parameterless `clear` method, which will be called e.g. when the
adapter is changed and has to remove all items. It can also receive an argument describing the id of its parent, which
should make the `StructureStrategy` only remove items being children from this parent.

In order to add items to the `StructureStrategy` there is a `addItem` method, which takes the item itself, and its
parent. This method can add an envelope around the actual item before adding it to the data property if necessary.
Mind that this method should also be called recursively, if the passed item has children. This ensures that the
`List` can be loaded with a single request containing data from multiple levels of the passed hierarchy.

There are also the `activate` and `deactivate` functions, which gets an id when an item gets active, e.g. by expanding
or collapsing it in the `tree_table` adapter. There are also a `findById` function which searches for a given id in
the `StructureStrategy` and a `remove` function which deletes some item from the structure.

In addition to the `data` variable there are also the `visibleItems` and `activeItems` arrays. The `visibleItems` are
a flat list of all visible items, which is used for the "Select all" functionality of the `List`. The
`activeItems` allow to highlight the active items in the `ListAdapter`.
