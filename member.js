document.addEventListener('DOMContentLoaded', function() {
    const memberForm = document.getElementById('memberForm');
    const membersTable = document.querySelector('#membersTable tbody');
    let currentMemberId = null;

    function loadMembers() {
        membersTable.innerHTML = scoutMembers.data.map(member => `
            <tr data-id="${member.id}">
                <td>${member.name}</td>
                <td>${member.role}</td>
                <td>${member.patrol || '-'}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${member.id}">Edit</button>
                    <button class="action-btn delete-btn" data-id="${member.id}">Delete</button>
                </td>
            </tr>
        `).join('');

        // Add event listeners
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const memberId = parseInt(this.getAttribute('data-id'));
                const member = scoutMembers.data.find(m => m.id === memberId);
                if (member) {
                    currentMemberId = memberId;
                    document.getElementById('memberId').value = memberId;
                    document.getElementById('memberName').value = member.name;
                    document.getElementById('memberRole').value = member.role;
                    document.getElementById('memberPatrol').value = member.patrol || '';
                }
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this member?')) {
                    const memberId = parseInt(this.getAttribute('data-id'));
                    scoutMembers.delete(memberId);
                    loadMembers();
                }
            });
        });
    }

    memberForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const memberData = {
            name: document.getElementById('memberName').value,
            role: document.getElementById('memberRole').value,
            patrol: document.getElementById('memberPatrol').value || null
        };

        if (currentMemberId) {
            scoutMembers.update(currentMemberId, memberData);
        } else {
            scoutMembers.add(memberData);
        }

        memberForm.reset();
        currentMemberId = null;
        loadMembers();
    });

    document.getElementById('cancelBtn').addEventListener('click', function() {
        memberForm.reset();
        currentMemberId = null;
    });

    // Initial load
    loadMembers();
});
