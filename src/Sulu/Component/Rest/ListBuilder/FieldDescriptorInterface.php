<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Component\Rest\ListBuilder;

use Sulu\Component\Rest\ListBuilder\Metadata\AbstractPropertyMetadata;

/**
 * Interface for all field-descriptors.
 */
interface FieldDescriptorInterface
{
    const VISIBILITY_ALWAYS = 'always';

    const VISIBILITY_NEVER = 'never';

    const VISIBILITY_YES = 'yes';

    const VISIBILITY_NO = 'no';

    const SEARCHABILITY_NEVER = 'never';

    const SEARCHABILITY_YES = 'yes';

    const SEARCHABILITY_NO = 'no';

    const WIDTH_AUTO = 'auto';

    const WIDTH_SHRINK = 'shrink';

    /**
     * Returns the name of the field.
     *
     * @return string
     */
    public function getName();

    /**
     * Returns whether the field is disabled or not.
     *
     * @return bool
     */
    public function getDisabled();

    /**
     * Returns the translation code of the field.
     *
     * @return string
     */
    public function getTranslation();

    /**
     * Returns the type of the field.
     *
     * @return string
     */
    public function getType();

    /**
     * @return bool
     */
    public function getDefault();

    /**
     * @return bool
     */
    public function getSortable();

    /**
     * @return string
     */
    public function getVisibility();

    /**
     * @return string
     */
    public function getSearchability();

    public function getWidth(): string;

    /**
     * @return AbstractPropertyMetadata
     */
    public function getMetadata();

    /**
     * Compares current instance of FieldDescriptor with another instance.
     *
     * @param FieldDescriptorInterface $other
     *
     * @return bool
     */
    public function compare(self $other);
}
