const logout=document.getElementById('logout');
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state based on localStorage
    // if (localStorage.getItem('user') === '') {
    //     window.location.href = 'index.html';
    // }
    logout.addEventListener('click',()=>{
        localStorage.setItem('loggedInUser') === '';
        window.location.href = 'index.html';
    });
});
let user = JSON.parse(localStorage.getItem('loggedInUser'))


document.getElementById('myForm').onsubmit = function(e) {
    let valid = true;
    const subject = document.getElementById('subject').value.trim();
    const priority = document.getElementById('priority').value;
    const topic = document.getElementById('topic').value.trim() ;
    const desc =document.getElementById('description').value.trim() ;
    if (subject === '') {
        document.getElementById('r1').classList.add('reddiv1');
        valid = false;
    } 

    if (priority === '') {
        document.getElementById('r2').classList.add('reddiv1');
        valid = false;
    } 

    if (topic === '') {
        document.getElementById('r3').classList.add('reddiv1');
        valid = false;
    } 
    if (desc=== '') {
        document.getElementById('r4').classList.add('reddiv1');
        valid = false;
    } 

    if (!valid){
        e.preventDefault(); // stop form submit if invalid
        return
    }
    
    addTicket({ subject, priority, topic, desc,user:user.username });
};
const addTicket =(ticket) =>{
    console.log('1')
    // Get existing tickets from localStorage (if any)
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];

    // Add new ticket to array
    tickets.push(ticket);

    // Save back to localStorage
    localStorage.setItem('tickets', JSON.stringify(tickets));

    alert('Ticket added successfully!');
    document.getElementById('myForm').reset(); // clear form after save

}

document.addEventListener('DOMContentLoaded', () => {
    const userw=document.getElementById('userw');
userw.innerHTML=`Hi!${user.username}`||'hi';
    loadTickets();
});