<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Tests\Traits\DatabaseSeeder;

abstract class TestCase extends BaseTestCase
{
    use DatabaseSeeder;
}
