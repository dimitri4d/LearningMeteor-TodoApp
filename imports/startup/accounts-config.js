import {meteor } from 'meteor/accounts-base';

Accounts.ui.config({
    passwordSignupFields:'USERNAME_ONLY',
});
