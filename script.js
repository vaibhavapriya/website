// function toggleDarkMode() {
//     document.body.classList.toggle('dark-mode');
//     if (document.body.classList.contains('dark-mode')) {
//         localStorage.setItem('darkMode', 'enabled');
//     } else {
//         localStorage.removeItem('darkMode');
//     }
// }
    // document.addEventListener('DOMContentLoaded', () => {
    //     if (localStorage.getItem('darkMode') === 'enabled') {
    //         document.body.classList.add('dark-mode');
    //     }
    // });
    document.addEventListener('DOMContentLoaded', () => {
        const darkModeToggle = document.getElementById('darkModeToggle');
    
        // Set initial state based on localStorage
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true; // Switch is on
        }
    
        // Listen for toggle switch change
        darkModeToggle.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.removeItem('darkMode');
            }
        });
    });
    

let users = JSON.parse(localStorage.getItem('users')) || [];

// If it's the registration page, attach form validation
const registerForm = document.getElementById("r");
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        if (!validateRegisterForm()) {
            e.preventDefault() ;// Stop form submission if validation fails
            return
        }
        const password = document.getElementById('password').value.trim();
        const password1 = document.getElementById('password1').value.trim();
        const username = document.getElementById('user').value.trim();
        const email = document.getElementById('email').value.trim();
        const subscribed = document.getElementById('sub').checked;
    
        if (password !== password1) {
            const a4=document.getElementById("r4")
            a4.classList.add('reddiv1');
            document.getElementById('password').classList.add('rbg');
            document.getElementById('password1').classList.add('rbg');
            e.preventDefault() ;
            return;
            
        }

        // Check if email already exists in localStorage
        const emailExists = users.some(user => user.email === email);
        if (emailExists) {
            e.preventDefault();
            const a5=document.getElementById("r5")
            a5.classList.add('reddiv1');
            setTimeout(function() {
                a5.classList.remove('reddiv1');
            }, 2000);  // 60000 milliseconds = 1 minute
            
            
            return;
        }

            // If unique, register the new user
        const newUser = { username, email, password, subscribed };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log(newUser);
        console.log(users)

        
        window.location.href = 'index.html';
    });
}
function validateRegisterForm() {
    const username = document.getElementById('user').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const divcon = document.getElementById('r');
    let c=true;
    
    if(!username){
        //createDiv('username')
        const a1=document.getElementById("r1")
        a1.classList.add('reddiv1');
        //username.classList.add('rbg');
        c=false;
    }
    if(!email){
        const a2=document.getElementById("r2")
        a2.classList.add('reddiv1');
        //email.classList.add('rbg');
        c=false;
    }
    if(!password){
        const a3=document.getElementById("r3")
        a3.classList.add('reddiv1');
       // password.classList.add('rbg');
        c= false;
    }
    return c;

}
function createDiv(x){
    const divcon = document.getElementById('q');
    const act = document.createElement("div");
    act.innerText=""
    act.classList.add('reddiv');
    act.innerText=`Please enter the ${x}`;
    divcon.appendChild(act);

}

const loginForm = document.getElementById("l");
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const a6=document.getElementById('r6');
        const a7=document.getElementById('r7');
        const a8=document.getElementById('r8');
        if(!email||!password){
            
            if(!email){
                a6.classList.add('reddiv1');
                //document.getElementById('email').classList.add('rbg');
            }
            if(!password){
                a7.classList.add('reddiv1');
                //password.classList.add('rbg');
            }
            e.preventDefault();
            return;
        }
        

        const matchedUser = users.find(user => user.email === email && user.password === password);

        if (matchedUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(matchedUser)); // Store logged-in user info if needed
            window.location.href = 'home.html'; // Redirect after login (change to your desired page)
        } else {
            a8.classList.add('reddiv1');
        }
    });
}

// Add animation when a button is clicked
// document.querySelectorAll('a').forEach(a => {
//     a.addEventListener('click', () => {
//         const content = document.querySelector('.content');  // or find related content dynamically
//         content.classList.add('active');

//         setTimeout(() => {
//             content.classList.remove('active');
//         }, 500); // match your CSS animation duration
//     });
// });

