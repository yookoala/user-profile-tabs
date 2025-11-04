<?php

declare(strict_types=1);


namespace Yookoala\UserProfileTabs\Tests\Acceptance;

use Yookoala\UserProfileTabs\Tests\Support\AcceptanceTester;

final class AdminPageTabsCest
{
    public function __construct(
        protected $username = 'user',
        protected $password = 'password',
    )
    {
    }

    public function _before(AcceptanceTester $I): void
    {
        $I->amOnPage('/wp-admin');

        // See and fill in WordPress login form
        $I->seeElement('form#loginform');
        $I->fillField('input#user_login', $this->username);
        $I->fillField('input#user_pass', $this->password);
        $I->click('input#wp-submit');

        // Check if there is error message
        $I->dontSee('Error: ');

        // Check if the user is at dashboard page
        $I->see('Dashboard');
    }

    public function testIfUserProfileSectionHasBeenGroupedInTabs(AcceptanceTester $I): void
    {
        // Go to user profile page
        $I->amOnPage('/wp-admin/profile.php');
        $I->makeScreenshot('user-profile-page__default');

        // Check if the user profile tabs elements are present
        $I->seeElement('.user-profile-tabs');
        $I->seeElement('.user-profile-tabs .tab-link-wrapper');
        $I->seeElement('.user-profile-tabs .tab-link-wrapper .tab-link');
        $I->seeElement('.user-profile-tabs .tab-link-wrapper .tab-link.active');

        // Count the number of tabs
        $I->seeNumberOfElements('.user-profile-tabs .tab-link-wrapper .tab-link', 6);
        $I->canSee('Personal Options', '.user-profile-tabs .tabs .tab.active');
        $I->canSee('Admin Color Scheme', '.user-profile-tabs .tabs .tab.active');

        // Click on another tab with the name "Contact Info"
        $I->click('Contact Info');
        $I->cantSee('Personal Options', '.user-profile-tabs .tabs .tab.active');
        $I->canSee('Contact Info', '.user-profile-tabs .tabs .tab.active');
        $I->canSee('Email (required)', '.user-profile-tabs .tabs .tab.active');
        $I->makeScreenshot('user-profile-page__contact-info-tab');
    }
}
