const params = new URLSearchParams(window.location.search);
const userName = params.get('userName');

async function fetchUserDetails() {
    try {
        const res = await fetch(`https://api.github.com/users/${userName}`);
        if (!res.ok) {
            throw new Error(`Failed to fetch ${userName}'s Data`);
        }
        const userData = await res.json();
        return userData;
    }
    catch (err) {
        alert(err.message);
        throw err;
    }
}
async function main() {
    try {
        const userData = await fetchUserDetails();
        renderUser(userData);
    } catch (err) {
        console.log(err.message);
    }
}

function renderUser(user) {
    const section = document.querySelector('section');
    section.classList.add('profile-wrapper');
    section.innerHTML = `
        <header>
            <h1>${user.login}'s Details</h1>
        </header>
        <div class="profile-card">
            
            <div class="profile-img">
                <img src=${user.avatar_url} alt="User Avatar">
            </div>

            <div class="profile-content">
                <h2 class="profile-name">${user.name || "Not Available"}</h2>
                <p class="profile-bio">${user.bio || "No bio available"}</p>

                <div class="profile-meta">
                    <p><span class="label">Company:</span> <span class="value">${user.company || "Not Available"}</span></p>
                    <p><span class="label">Location:</span> <span class="value">${user.location || "Not Available"}</span></p>
                </div>

                <div class="profile-stats">
                    <div class="stat">
                        <h3>${user.public_repos}</h3>
                        <p>Repos</p>
                    </div>
                    <div class="stat">
                        <h3>${user.followers}</h3>
                        <p>Followers</p>
                    </div>
                    <div class="stat">
                        <h3>${user.following}</h3>
                        <p>Following</p>
                    </div>
                </div>

                <a href="${user.html_url}" target="_blank" class="profile-btn">Visit Profile</a>
            </div>

        </div>`
}
main();