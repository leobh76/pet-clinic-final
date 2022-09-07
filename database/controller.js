/* Controller */
import Users from "../model/user";

// GET : http://localhost:3000/api/users
export async function getUsers(req, res) {
  try {
    const {ownerName, petName, petType, sortByName, sortByPetName} = req.query;
    
    const query = {};
    if (ownerName) query.ownerName = ownerName;
    if (petName) query.petName = petName;
    if (petType) {
      if (petType.length === 1) {
        query.petType = petType;
      } else {
        query.petType = {$in: petType};
      }
    }
     
    const sorter = {};
    if (sortByName) sorter.ownerName = sortByName;
    if (sortByPetName) sorter.petName = sortByPetName;

    const users = await Users.find(query).sort(sorter);

    if (!users) return res.status(404).json({ error: "Data not found!" });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: "Error while fetching data!" });
  }
}

// GET : http://localhost:3000/api/users/1
export async function getUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await Users.findById(userId);
      return res.status(200).json(user);
    }
    return res.status(404).json({ error: "User not selected!" });
  } catch (error) {
    res.status(404).json({ error: "Cannot get the user!" });
  }
}

// POST : http://localhost:3000/api/users
export async function postUser(req, res) {
  try {
    const formData = req.body;

    if (!formData)
      return res.status(404).json({ error: "Form data not provided!" });
    Users.create(formData, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
}

// PUT : http://localhost:3000/api/users/1
export async function putUser(req, res) {
  try {
    const { userId } = req.query;
    const formData = req.body;

    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "User not selected!" });
  } catch (error) {
    res.status(404).json({ error: "Error while updating the data!" });
  }
}

// DELETE : http://localhost:3000/api/users/1
export async function deleteUser(req, res) {
  try {
    const { userId } = req.query;
    if (userId) {
      const user = await Users.findByIdAndDelete(userId);
      return res.status(200).json(user);
    }
    res.status(404).json({ error: "User not selected!" });
  } catch (error) {
    res.status(404).json({ error: "Error while deleting the user!" });
  }
}
