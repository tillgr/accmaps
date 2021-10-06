import {UserProfile} from "../userProfile";
import {Modal} from "materialize-css";
import {UserGroups} from "../data/userGroups";
import {UserGroupEnum} from "../interfaces/userGroupEnum";

export const UserProfileModal = {
    create(): void {
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
            button.innerHTML = v.name + ' <span class="secondary-content" aria-hidden="true"><i class="material-icons">' + v.icon + '</i></span>';
            button.onclick = () => UserProfileModal.setUserProfile(k);

            if (UserProfile.get() === k) {
                button.classList.add('active');
            }

            document.getElementById('userProfileList').append(button);
        });

    },

    show(): void {
        const modal = document.getElementById('userProfileModal');
        Modal.getInstance(modal).open();
        overlayAccessibility();

        document.getElementById('userProfileList').focus();
    },

    close(): void {
        const modal = document.getElementById('userProfileModal');
        Modal.getInstance(modal).close();
    },

    setUserProfile(userGroup: UserGroupEnum): void {
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

function overlayAccessibility() {
    const overlayDivs = document.getElementsByClassName('modal-overlay');

    [].forEach.call(overlayDivs, (overlay: HTMLElement) => {
        overlay.setAttribute('aria-disabled', 'true');
    })
}
