import {UserGroup} from "../data/userGroup";
import {UserProfile} from "../userProfile";
import {Modal} from "materialize-css";
import {UserGroupName} from "../data/userGroupName";

export const UserProfileModal = {
    create() {
        const selectedUserProfile = localStorage.getItem('userProfile');
        if (selectedUserProfile !== null) {
            UserProfileModal.close();
            M.toast({html: 'User profile already set: ' + UserGroupName.get(<UserGroup>parseInt(selectedUserProfile)) + '<button class="btn-flat toast-action" id="changeUserProfileBtn">change</button>'});
            document.getElementById('changeUserProfileBtn').onclick = UserProfileModal.show;
        } else {
            UserProfileModal.show();
        }

        document.getElementById('userProfileNormal').onclick = () => setUserProfile(UserGroup.noImpairments);
        document.getElementById('userProfileVI').onclick = () => setUserProfile(UserGroup.blindPeople);
        document.getElementById('userProfileWheelchair').onclick = () => setUserProfile(UserGroup.wheelchairUsers);
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
    M.toast({html: 'Set user profile to:' + UserGroupName.get(userGroup)});
}
