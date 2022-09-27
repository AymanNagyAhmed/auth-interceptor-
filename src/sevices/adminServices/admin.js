import { api } from "@/helpers/axios.config";
import { makeFilterString } from '@/helpers/utils';


export async function getProjectDetails(project_id) {
  let res = await api.get("admins/project_details/" + project_id);
  if (res) return res.data;
  else return false;
}
export async function getProducts(objFilter) {
    let res = await api.get("dashboard/products/" + makeFilterString(objFilter));
    if (res) return res.data;
    else return false;
  }
  
  
export async function getProjectList() {
  let res = await api.get("admins/list_projects");
  if (res) return res.data;
  else return false;
}

export async function createProject(
  start_date,
  end_date,
  project_name,
  name,
  email,
  password,
  start_shift_from,
  end_shift_in,
  image_base64
) {
  let res = await api.post("admins/add_project", {
    start_date: start_date,
    end_date: end_date,
    project_name: project_name,
    name: name,
    email: email,
    password: password,
    start_shift_from: start_shift_from,
    end_shift_in: end_shift_in,
    image_base64: image_base64,
  });
  if (res) return res.data;
  else return false;
}

export async function deleteProject(project_id) {
  let res = await api.delete("admins/delete_project/" + project_id);
  if (res) return res.data;
  else return false;
}

export async function editProject(
  project_id,
  start_date,
  end_date,
  project_name,
  name,
  email,
  password,
  start_shift_from,
  end_shift_in,
  image_base64
) {
  let res = await api.put("admins/edit_project/" + project_id, {
    start_date: start_date,
    end_date: end_date,
    project_name: project_name,
    name: name,
    email: email,
    password: password,
    start_shift_from: start_shift_from,
    end_shift_in: end_shift_in,
    image_base64: image_base64,
  });
  if (res) return res.data;
  else return false;
}
