<?php

/*
 * This file is part of Sulu.
 *
 * (c) Sulu GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\WebsiteBundle\Cache;

/**
 * Clear http_cache for website.
 */
interface CacheClearerInterface
{
    /**
     * Clear the website cache.
     */
    public function clear(/*?array $tags = null*/);
}
