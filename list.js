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
console.log(JSON.parse(localStorage.getItem('tickets')));
const loggedInUser=JSON.parse(localStorage.getItem('loggedInUser'));
currentUser=loggedInUser.username
console.log(currentUser)
function loadTickets() {
    console.log("1")
    const ticketsList = document.getElementById('ticketsList');
    ticketsList.innerHTML = ''; // clear previous list

    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    const currentUser=currentUser=loggedInUser.username
    const mytickets=tickets.filter(ticket => ticket.user === currentUser);

    if (mytickets.length === 0) {
        ticketsList.innerHTML = '<p>No tickets found!</p>';
        return;
    }

    mytickets.forEach((ticket, index) => {
        const ticketDiv = document.createElement('div');
        ticketDiv.className = 'ticket-item';

        ticketDiv.innerHTML = `
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
                <button onclick="deleteTicket(${index})" class="delete-btn">Delete</button>
            </div>
        </div>
        `;

        ticketsList.appendChild(ticketDiv);
    });
}

function deleteTicket(index) {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    tickets.splice(index, 1);
    localStorage.setItem('tickets', JSON.stringify(tickets));
    loadTickets(); // refresh list after delete
}

// Initial load of tickets
loadTickets();