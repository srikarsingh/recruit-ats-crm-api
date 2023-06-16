  const allRoles = {
    account_owner: [
      "manageUsers",
      "getUsers"
    ],
    admin: [
      "manageUsers",
      "getUsers"
    ],
    team_member: [
      "getUsers"
    ],
    restricted_team_member: [
     
    ],
  };

  const roles = Object.keys(allRoles);
  const roleRights = new Map(Object.entries(allRoles));
  
  module.exports = {
    roles,
    roleRights
  };