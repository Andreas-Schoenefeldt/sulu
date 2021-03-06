<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Component\Rest\Exception;

/**
 * This exception should be thrown when a unique constraint violation for a enitity occures.
 */
class UniqueConstraintViolationException extends ConstraintViolationException
{
    /**
     * @param string $field
     */
    public function __construct($field, $entity)
    {
        parent::__construct($field, $entity, ConstraintViolationException::UNIQUE, static::EXCEPTION_CODE_UNIQUE_CONSTRAINT_VIOLATION);
    }
}
