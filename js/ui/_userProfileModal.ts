import {UserGroup} from "../data/userGroup";
import {UserProfile} from "../userProfile";
import {Modal} from "materialize-css";

export const UserProfileModal = {
    create() {
        const selectedUserProfile = localStorage.getItem('userProfile');
        if (selectedUserProfile !== null) {
            UserProfileModal.close();
            M.toast({html: 'User profile already set.'})
        } else {
            UserProfileModal.show();
        }

        document.getElementById('userProfileNormal').addEventListener('click', () => setUserProfile(UserGroup.noImpairments));
        document.getElementById('userProfileVI').addEventListener('click', () => setUserProfile(UserGroup.blindPeople));
        document.getElementById('userProfileWheelchair').addEventListener('click', () => setUserProfile(UserGroup.blindPeople));
    },

    show() {
        const modal = document.getElementById('userProfileModal');
        Modal.getInstance(modal).open();
    },

    close() {
        const modal = document.getElementById('userProfileModal');
        Modal.getInstance(modal).close();
    }
};

function setUserProfile(userGroup: UserGroup) {
    UserProfile.set(userGroup);
    localStorage.setItem('userProfile', userGroup.toString());
    UserProfileModal.close();
    M.toast({html: 'Set user profile.'})

}
