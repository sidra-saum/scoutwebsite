document.addEventListener('DOMContentLoaded', function() {
    const membersGrid = document.getElementById('membersGrid');
    const roleFilter = document.getElementById('roleFilter');
    const searchInput = document.getElementById('searchInput');

    function displayMembers() {
        const role = roleFilter.value;
        const searchTerm = searchInput.value.toLowerCase();
        
        const filtered = scoutMembers.data.filter(member => {
            const roleMatch = role === 'all' || member.role === role;
            const searchMatch = member.name.toLowerCase().includes(searchTerm) || 
                              member.role.toLowerCase().includes(searchTerm) ||
                              (member.patrol && member.patrol.toLowerCase().includes(searchTerm));
            return roleMatch && searchMatch;
        });
        
        membersGrid.innerHTML = filtered.map(member => `
            <div class="member-card">
                <div class="member-avatar">${member.avatar}</div>
                <h3 class="member-name">${member.name}</h3>
                <p class="member-role">${member.role}</p>
                <p class="member-patrol">${member.patrol || 'General Troop'}</p>
            </div>
        `).join('');
    }

    // Initial display
    displayMembers();

    // Filter events
    roleFilter.addEventListener('change', displayMembers);
    searchInput.addEventListener('input', displayMembers);

    // Listen for updates from admin
    window.addEventListener('membersUpdated', displayMembers);
});