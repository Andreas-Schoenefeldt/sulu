<?php

namespace Sulu\Bundle\LocationBundle\Tests\Unit\Geolocator;

use Sulu\Bundle\LocationBundle\Geolocator\GeolocatorLocation;

class GeolocatorLocationTest extends \PHPUnit_Framework_TestCase
{
    protected $geolocatorLocation;

    public function setUp()
    {
        $this->location = new GeolocatorLocation();
    }

    public function testToArray()
    {
        $data = array(
            'id' => null,
            'displayTitle' => 'This is title',
            'name' => 'This is title',
            'street' => 'This is street',
            'number' => 'This is number',
            'code' => 'This is code',
            'town' => 'This is town',
            'country' => 'This is country',
            'longitude' => '50.123',
            'latitude' => '-1.123',
        );

        foreach ($data as $propName => $value) {
            $this->location->{'set' . ucfirst($propName)}($value);
        }

        $res = $this->location->toArray();
        $this->assertEquals($data, $res);
    }
}
