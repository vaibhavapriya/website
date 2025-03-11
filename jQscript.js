//implementation using jquery

// document.addEventListener('DOMContentLoaded', () => {
//     const darkModeToggle = document.getElementById('darkModeToggle'); //$('#darkModeToggle')

//     // Set initial state based on localStorage
//     if (localStorage.getItem('darkMode') === 'enabled') {
//         document.body.classList.add('dark-mode');
//         darkModeToggle.checked = true; // Switch is on
//     }

//     // Listen for toggle switch change
//     darkModeToggle.addEventListener('change', () => {
//         document.body.classList.toggle('dark-mode');
//         if (document.body.classList.contains('dark-mode')) {
//             localStorage.setItem('darkMode', 'enabled');
//         } else {
//             localStorage.removeItem('darkMode');
//         }
//     });
// });
$(document).ready(() => {
    const $darkModeToggle = $('#darkModeToggle'); // Cache selector for better performance

    if (localStorage.getItem('darkMode') === 'enabled') {
        $('body').addClass('dark-mode');
        $darkModeToggle.prop('checked', true); // Correct way to toggle checkboxes in jQuery
    }
    $darkModeToggle.on('change', () => {
        $('body').toggleClass('dark-mode');
        if ($('body').hasClass('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.removeItem('darkMode');
        }
    });
});

let users = JSON.parse(localStorage.getItem('users')) || [];
let user = JSON.parse(localStorage.getItem('loggedInUser'));

// If it's the registration page, attach form validation
const registerForm=$("#r");
if(registerForm){
    registerForm.on('submit',(e)=>{
        const password = $('#password').val().trim();
        const password1 = $('#password1').val().trim();
        const username = $('#user').val().trim();
        const email = $('#email').val().trim();
        const subscribed = $('#sub').prop('checked');
        function validateRegisterForm() {
            let c=true;   
            if(!username){
                $("#r1").addClass('reddiv1')
                c=false;
            }
            if(!email){
                $("#r2").addClass('reddiv1')
                c=false;
            }
            if(!password){
                $("#r3").addClass('reddiv1')
                c=false;
            }
            if (password !== password1) {
                $("r4").addClass('reddiv1');
                // not right thing .best pratice <div class..></div> in js innertext/innerhtml for spacing
                $('#password').addClass('rbg');
                $('#password1').addClass('rbg');
                c=false;
            }
            return c; 
        }
        if (!validateRegisterForm()) {
            e.preventDefault() ;// Stop form submission if validation fails
            return
        }
        // Check if email already exists in localStorage
        const emailExists = users.some(user => user.email === email);
        if (emailExists) {
        e.preventDefault();
        $("#r5").addClass('reddiv1');
        setTimeout(function() {
            $("#r5").removeClass('reddiv1');
        }, 2000);  // 60000 milliseconds = 1 minute
        return;
        }
        // If unique, register the new user
        const newUser = { username, email, password, subscribed };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert("new user added")
        window.location.href = 'index.html';
    })
}

//const registerForm = document.getElementById("r");
// if (registerForm) {
// registerForm.addEventListener('submit', (e) => {
//     if (!validateRegisterForm()) {
//         e.preventDefault() ;// Stop form submission if validation fails
//         return
//     }
//     const password = document.getElementById('password').value.trim();
//     const password1 = document.getElementById('password1').value.trim();
//     const username = document.getElementById('user').value.trim();
//     const email = document.getElementById('email').value.trim();
//     const subscribed = document.getElementById('sub').checked;

//     if (password !== password1) {
//         const a4=document.getElementById("r4")
//         a4.classList.add('reddiv1');
//         // not right thing .best pratice <div class..></div> in js innertext/innerhtml for spacing
//         document.getElementById('password').classList.add('rbg');
//         document.getElementById('password1').classList.add('rbg');
//         e.preventDefault() ;
//         return;
        
//     }

//     // Check if email already exists in localStorage
//     const emailExists = users.some(user => user.email === email);
//     if (emailExists) {
//         e.preventDefault();
//         const a5=document.getElementById("r5")
//         a5.classList.add('reddiv1');
//         setTimeout(function() {
//             a5.classList.remove('reddiv1');
//         }, 2000);  // 60000 milliseconds = 1 minute
        
        
//         return;
//     }

//         // If unique, register the new user
//     const newUser = { username, email, password, subscribed };
//     users.push(newUser);
//     localStorage.setItem('users', JSON.stringify(users));
//     console.log(newUser);
//     console.log(users)

    
//     window.location.href = 'index.html';
// });
// }
// function validateRegisterForm() {
// const username = document.getElementById('user').value.trim();
// const email = document.getElementById('email').value.trim();
// const password = document.getElementById('password').value.trim();
// const divcon = document.getElementById('r');
// let c=true;

// if(!username){
//     //createDiv('username')
//     const a1=document.getElementById("r1")
//     a1.classList.add('reddiv1');
//     //username.classList.add('rbg');
//     c=false;
// }
// if(!email){
//     const a2=document.getElementById("r2")
//     a2.classList.add('reddiv1');
//     //email.classList.add('rbg');
//     c=false;
// }
// if(!password){
//     const a3=document.getElementById("r3")
//     a3.classList.add('reddiv1');
//    // password.classList.add('rbg');
//     c= false;
// }
// return c;

// }
// function createDiv(x){
// const divcon = document.getElementById('q');
// const act = document.createElement("div");
// act.innerText=""
// act.classList.add('reddiv');
// act.innerText=`Please enter the ${x}`;
// divcon.appendChild(act);
// } better than showa nd hide div for alert it is better to write addEventListener addEventListener.innerText
const loginForm = $("#l");
if (loginForm) {
loginForm.on('submit', (e) => {
    e.preventDefault();

    const email = $('#email').val().trim();
    const password = $('#password').val().trim();
    if(!email||!password){
        if(!email){
            $("#r6").addClass('reddiv1');
        }
        if(!password){
            $("#r7").addClass('reddiv1');
        }
        e.preventDefault();
        return;
    }
    const matchedUser = users.find(user => user.email === email && user.password === password);
    if (matchedUser) {
        localStorage.setItem('loggedInUser', JSON.stringify(matchedUser)); // Store logged-in user info if needed
        let user = JSON.parse(localStorage.getItem('loggedInUser'))
        window.location.href = 'home.html'; // Redirect after login (change to your desired page)
        //console.log(user)
    } else {
        $('r8').addClass('reddiv1');
    }
});
}

const logout=$('#logout');
if (logout){
    logout.on('click',()=>{
        localStorage.setItem('loggedInUser') === '';
        window.location.href = 'index.html';
    })
}
if(user){
    $('#userw').html(`Hi!   ${user.username}`||'hi');
    loadTickets();
}
function loadTickets() {
    $('#ticketsList').html(''); // clear previous list

    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    const currentUser=user.username;
    const mytickets=tickets.filter(ticket => ticket.user === currentUser);

    if (mytickets.length === 0) {
        $('#ticketsList').html('<p>No tickets found!</p>'); 
        return;
    }

    mytickets.forEach((ticket, index) => {
        const ticketDiv = $(`
            <div class="ticket-item">
                <div class="ticket-subject"><strong>Subject:</strong> ${ticket.subject}</div>
                <div class="ticket-details">
                    <div><strong>Priority:</strong> ${ticket.priority}</div>
                    <div><strong>Topic:</strong> ${ticket.topic}</div>
                </div>
                <div class="ticket-description">
                    <strong>Description:</strong> ${ticket.desc}
                </div>
                <div class="ticket-actions">
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            </div>
        `);
    
        $('#ticketsList').append(ticketDiv);
    });
    
    // Event delegation for dynamically added elements
    $('#ticketsList').on('click', '.delete-btn', function () {
        const index = $(this).data('index');
        deleteTicket(index);
    });    
}

function deleteTicket(index) {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    tickets.splice(index, 1);
    localStorage.setItem('tickets', JSON.stringify(tickets));
    loadTickets(); // refresh list after delete
}

const ticketform=$('#myForm');
if(ticketform){
    ticketform.on('submit',(e)=>{
        let valid = true;
        const subject = $('#subject').val().trim();
        const priority = $('#priority').val();
        const topic = $('#topic').val().trim();
        const desc = $('#description').val().trim();
        if (subject === '') {
            $('r1').addClass('reddiv1');
            valid = false;
        } 
        if (priority === '') {
            $('r2').addClass('reddiv1');
            valid = false;
        } 
        if (topic === '') {
            $('r3').addClass('reddiv1');
            valid = false;
        } 
        if (desc=== '')  {
            $('r4').addClass('reddiv1');
            valid = false;
        } 
        if (!valid){
            e.preventDefault(); // stop form submit if invalid
            return
        }
        addTicket({ subject, priority, topic, desc,user:user.username });
    })
}
const addTicket =(ticket) =>{
    console.log('1')
    // Get existing tickets from localStorage (if any)
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];

    // Add new ticket to array
    tickets.push(ticket);

    // Save back to localStorage
    localStorage.setItem('tickets', JSON.stringify(tickets));

    //alertfun('Ticket added successfully!'); //modal
    document.getElementById('myForm').reset(); // clear form after save
    loadTickets();

}
// function alertfun(a){
//     const alertDiv = $(`
//         <div class="ticket-item alert-item">
//             ${a}
//         </div>
//     `);

//     $('.pageh').append(alertDiv);
//     $('#alert-item').remove();
// }