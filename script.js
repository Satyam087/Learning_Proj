const parent = document.querySelector('section');

async function getUserdata(){
    try{
        const response = await fetch('https://api.github.com/users'); //wait for response
        if(!response.ok) throw new Error("Failed");
        const data = await response.json();
        return data;
    }
    catch(error){
        alert(error.message);
        throw error;
    }
}
function showCard(user){
    const {avatar_url, login, html_url} = user; 
    const div = document.createElement('div');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const a = document.createElement('a');
    div.dataset.userName = login;
    img.src=avatar_url;
    h3.textContent = login
    a.href = html_url;
    a.target = '_blank';
    a.textContent='Visit Profile';
    div.append(img);
    div.append(h3);
    div.append(a);
    parent.append(div);
}
// const getUsers = await getUserdata();

// getUsers.forEach(user => {
//     showCard(user);
// });
async function main() {
  try {
    const users = await getUserdata();
    users.forEach(showCard);
  } catch (err) {
    console.log(err.message);
  }

}
main();

function cardListeners(e){
    if(e.target.tagName === 'A') return;
    const div = e.target.closest('div');
    const user = div.dataset.userName;
    // window.location.href = `userdetalis.html?userName=${user}`;
    if(!user) return;
    window.open(`userdetails.html?userName=${user}`,'_blank');
    
}
parent.addEventListener('click', cardListeners);
//better
// async function getUserdata() {
//   const response = await fetch("https://api.github.com/users");
//   if (!response.ok) throw new Error("Failed");
//   return response.json();
// }
// async function main() {
//   try {
//     const users = await getUserdata();
//     users.forEach(showCard);
//   } catch (e) {
//     console.log(e.message);
//   }
// }
// main();