"use server";

import { createSupabaseServerClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function addCourseAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  
  const title = formData.get("title") as string;
  const progress = Number(formData.get("progress"));
  const icon_name = formData.get("icon_name") as string;

  if (!title || !icon_name) {
    return { success: false, error: "Title and Icon are required." };
  }

  const { error } = await supabase.from("courses").insert([
    {
      title,
      progress: isNaN(progress) ? 0 : progress,
      icon_name,
    },
  ]);

  if (error) {
    console.error("Failed to add course:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}

export async function updateCourseAction(id: string, formData: FormData) {
  const supabase = await createSupabaseServerClient();
  
  const title = formData.get("title") as string;
  const progress = Number(formData.get("progress"));
  const icon_name = formData.get("icon_name") as string;

  if (!title || !icon_name) {
    return { success: false, error: "Title and Icon are required." };
  }

  const { error } = await supabase
    .from("courses")
    .update({
      title,
      progress: isNaN(progress) ? 0 : progress,
      icon_name,
    })
    .eq("id", id);

  if (error) {
    console.error("Failed to update course:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}

export async function deleteCourseAction(id: string) {
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("courses").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete course:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}
