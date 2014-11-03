define([],function(){"use strict";return function(){var a,b="#package-form",c="",d="";return{view:!0,templates:["/admin/translate/template/package/form"],initialize:function(){this.saved=!0,c="",d="",this.formId="#package-form",this.form=!1,this.render(),this.setHeaderBar(!0),this.listenForChange()},render:function(){this.$el.html(this.renderTemplate("/admin/translate/template/package/form")),a=this.$el.find("#catalogues .catalogue-item:first"),a.remove(),this.initData(),this.sandbox.form.create(b),this.form=!0,this.bindDomEvents(),this.bindCustomEvents()},bindDomEvents:function(){this.sandbox.dom.on("#catalogue-add","click",this.addCatalogue.bind(this)),this.sandbox.dom.on("#catalogues","click",this.removeCatalogue.bind(this),".catalogue-remove"),this.sandbox.dom.keypress(this.formId,function(a){13===a.which&&(a.preventDefault(),this.submit())}.bind(this))},bindCustomEvents:function(){this.sandbox.on("sulu.header.toolbar.delete",function(){this.sandbox.emit("sulu.translate.package.delete",this.options.data.id)},this),this.sandbox.on("sulu.translate.package.saved",function(a,b){this.options.data=b,this.setHeaderBar(!0)},this),this.sandbox.on("sulu.header.toolbar.save",function(){this.submit()},this),this.sandbox.on("sulu.header.back",function(){this.sandbox.emit("sulu.translate.package.list")},this)},initData:function(){this.fillFields(this.options.data.catalogues,1,{id:null,isDefault:!0,locale:""}),this.initCatalogues(),this.sandbox.dom.val(".name-value",this.options.data.name?this.options.data.name:"")},initCatalogues:function(){this.sandbox.dom.remove("#catalogues .catalogue-item"),this.sandbox.dom.each(this.options.data.catalogues,function(c,d){var e=a.clone(),f=this.sandbox.dom.find(".is-default-value",e),g=this.sandbox.dom.find(".locale-value",e);this.sandbox.dom.data(e,"id",d.id),this.sandbox.dom.prop(f,"checked",d.isDefault?d.isDefault:!1),this.sandbox.dom.val(g,d.locale?d.locale:""),this.sandbox.dom.append("#catalogues",e),this.form&&(this.sandbox.form.addField(b,f),this.sandbox.form.addField(b,g))}.bind(this))},fillFields:function(a,b,c){for(;a.length<b;)a.push(c)},submit:function(){if(this.sandbox.form.validate(b)){var a,c,d,e,f,g={},h=this.sandbox.dom.find("#catalogues .catalogue-item");this.options.data.id&&(g.id=this.options.data.id),g.name=this.sandbox.dom.val(".name-value"),g.catalogues=[],this.sandbox.dom.each(h,function(b,h){c=this.sandbox.dom.data(h,"id"),d=this.sandbox.dom.$(h),e=this.sandbox.dom.find(".locale-value",d),f=this.sandbox.dom.find(".is-default-value",d),a={id:c,isDefault:this.sandbox.dom.prop(f,"checked"),locale:this.sandbox.dom.val(e)},g.catalogues.push(a)}.bind(this)),this.sandbox.emit("sulu.translate.package.save",g)}},addCatalogue:function(){var c=a.clone();this.sandbox.dom.append("#catalogues",c),this.sandbox.form.addField(b,c.find(".is-default-value")),this.sandbox.form.addField(b,c.find(".locale-value"))},removeCatalogue:function(a){var c=$(a.target).parent().parent().parent();this.sandbox.form.removeField(b,c.find(".is-default-value")),this.sandbox.form.removeField(b,c.find(".locale-value")),this.setHeaderBar(!1),c.remove()},setHeaderBar:function(a){if(a!==this.saved){var b=this.options.data&&this.options.data.id?"edit":"add";this.sandbox.emit("sulu.header.toolbar.state.change",b,a)}this.saved=a},listenForChange:function(){this.sandbox.dom.on(b,"change",function(){this.setHeaderBar(!1)}.bind(this),"select, input"),this.sandbox.dom.on(b,"keyup",function(){this.setHeaderBar(!1)}.bind(this),"input")}}}()});