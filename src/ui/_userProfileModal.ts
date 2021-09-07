import {UserProfile} from "../userProfile";
import {Modal} from "materialize-css";
import {UserGroups} from "../data/userGroups";
import {UserGroupEnum} from "../interfaces/userGroupEnum";

export const UserProfileModal = {
    create() {
        const selectedUserProfile = localStorage.getItem('userProfile');
        if (selectedUserProfile !== null) {
            UserProfileModal.close();
            M.toast({
                html: 'User profile already set:&nbsp;&nbsp;'
                    + '<i class="material-icons tiny" aria-disabled="true">' + UserGroups.get(<UserGroupEnum>parseInt(selectedUserProfile)).icon + '</i>&nbsp;'
                    + UserGroups.get(<UserGroupEnum>parseInt(selectedUserProfile)).name
                    + '<button class="btn-flat toast-action" id="changeUserProfileBtn">change</button>'
            });
            document.getElementById('changeUserProfileBtn').onclick = UserProfileModal.show;
        } else {
            UserProfileModal.show();
        }

        UserGroups.forEach((v, k) => {
            const button = document.createElement('a');
            button.className = 'collection-item';
            button.setAttribute('href', '#map');
            button.innerHTML = '<span>' + v.name + ' <span class="secondary-content"><i class="material-icons">' + v.icon + '</i></span></span>';
            button.onclick = () => UserProfileModal.setUserProfile(k);
            document.getElementById('userProfileList').append(button);
        });

    },

    show() {
        const modal = document.getElementById('userProfileModal');
        Modal.getInstance(modal).open();
    },

    close() {
        const modal = document.getElementById('userProfileModal');
        Modal.getInstance(modal).close();
    },

    setUserProfile(userGroup: UserGroupEnum) {
        UserProfile.set(userGroup);
        localStorage.setItem('userProfile', userGroup.toString());
        UserProfileModal.close();
        M.toast({
            html: 'Set user profile to:&nbsp;&nbsp;'
                + '<i class="material-icons tiny" aria-disabled="true">' + UserGroups.get(userGroup).icon + '</i>&nbsp;'
                + UserGroups.get(userGroup).name
        });
    }
};
