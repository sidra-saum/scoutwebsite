// Shared data structure (loaded by both admin and public pages)
const scoutMembers = {
    // Current members data
    data: JSON.parse(localStorage.getItem('scoutMembers')) || [
        {
            id: 1,
            name: "John Doe",
            role: "Scoutmaster",
            patrol: "Eagle Patrol",
            joinDate: "2022-01-15",
            avatar: "JD"
        },
        {
            id: 2,
            name: "Jane Smith",
            role: "Patrol Leader",
            patrol: "Wolf Patrol",
            joinDate: "2023-03-10",
            avatar: "JS"
        }
    ],

    // Save to localStorage
    save: function() {
        localStorage.setItem('scoutMembers', JSON.stringify(this.data));
        this.dispatchUpdate();
    },

    // Notify all pages of updates
    dispatchUpdate: function() {
        window.dispatchEvent(new CustomEvent('membersUpdated'));
    },

    // Add new member
    add: function(member) {
        member.id = this.data.length > 0 ? Math.max(...this.data.map(m => m.id)) + 1 : 1;
        member.avatar = this.getInitials(member.name);
        this.data.push(member);
        this.save();
    },

    // Update member
    update: function(id, updates) {
        const index = this.data.findIndex(m => m.id === id);
        if (index !== -1) {
            this.data[index] = {...this.data[index], ...updates};
            this.save();
        }
    },

    // Delete member
    delete: function(id) {
        this.data = this.data.filter(m => m.id !== id);
        this.save();
    },

    // Get initials for avatar
    getInitials: function(name) {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
};