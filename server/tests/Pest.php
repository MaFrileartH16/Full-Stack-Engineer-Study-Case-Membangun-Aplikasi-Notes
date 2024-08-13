<?php

    /*
    |--------------------------------------------------------------------------
    | Test Case
    |--------------------------------------------------------------------------
    |
    | The closure you provide to your test functions is always bound to a specific PHPUnit test
    | case class. By default, that class is "PHPUnit\Framework\TestCase". Of course, you may
    | need to change it using the "uses()" function to bind a different classes or traits.
    |
    */

    uses(
        Tests\TestCase::class,
        Illuminate\Foundation\Testing\RefreshDatabase::class,
        Nuwave\Lighthouse\Testing\MakesGraphQLRequests::class
    )->in('Feature');

    /*
    |--------------------------------------------------------------------------
    | Expectations
    |--------------------------------------------------------------------------
    |
    | When you're writing tests, you often need to check that values meet certain conditions. The
    | "expect()" function gives you access to a set of "expectations" methods that you can use
    | to assert different things. Of course, you may extend the Expectation API at any time.
    |
    */

    expect()->extend('toBeOne', function () {
        return $this->toBe(1);
    });

    /*
    |--------------------------------------------------------------------------
    | Functions
    |--------------------------------------------------------------------------
    |
    | While Pest is very powerful out-of-the-box, you may have some testing code specific to your
    | project that you don't want to repeat in every file. Here you can also expose helpers as
    | global functions to help you to reduce the number of lines of code in your test files.
    |
    */

    function something()
    {
        // ..
    }

    it('tests note created subscription', function () {
        // Subscribe to the noteCreated subscription
        $subscription = $this->graphQL('
        subscription {
            noteCreated {
                id
                title
                body
                created_at
                updated_at
            }
        }
    ');

        // Trigger the createNote mutation
        $this->graphQL('
        mutation {
            createNote(
                title: "Test Note"
                body: "This is a test note."
            ) {
                id
                title
                body
                created_at
                updated_at
            }
        }
    ');

        // Assert that the subscription receives the new note data
        $subscription->assertJson([
            'data' => [
                'noteCreated' => [
                    'title' => 'Test Note',
                    'body' => 'This is a test note.',
                ],
            ],
        ]);
    });
