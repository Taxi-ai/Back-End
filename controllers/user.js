// Getting Users Data
async function getUsers() {
  const users = await User.find();
  console.log(users);
}
// Updating Single User via _id
async function updateUser(id, updatedUser) {
  const user = await User.findByIdAndUpdate(
    id,
    { $set: updatedUser },
    { new: true }
  );
  console.log(user);
}
// Deleting Single User via _id
async function deleteUser(id) {
  const user = await User.findByIdAndRemove(id);
  console.log(user);
}
