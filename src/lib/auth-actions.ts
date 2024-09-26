// "use server";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import { supabase } from "@/utils/supabase/server";

// // MARK: Login
// export async function login(formData: FormData) {
//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };
//   console.log(data)

//   const { error } = await supabase.auth.signInWithPassword(data);

//   if (error) {
//     console.log('Login Error:==> ',error);
//     redirect("/error");
//   }

//   // revalidatePath("/", "layout");
//   redirect("/success");
// }

// // MARK: Signup
// export async function signup(formData: FormData) {
//   // const supabase = createClient();

//   // 获取表单数据并进行类型转换
//   const firstName = formData.get("first-name") as string;
//   const lastName = formData.get("last-name") as string;
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   const userData = {
//     email,
//     password,
//     options: {
//       data: {
//         full_name: `${firstName} ${lastName}`,
//       },
//       // Disable email confirmation (if desired)
//       emailRedirectTo: undefined,  // 取消邮箱验证链接
//     },
//   };

//   console.log("Signup Data:", userData);

//   // 调用 Supabase 注册 API
//   const { error } = await supabase.auth.signUp(userData);

//   if (error) {
//     console.error("Signup Error:", error);
//     redirect("/error");
//     return;
//   }

//   // 重新验证路径并重定向到 dashboard
//   // revalidatePath("/", "layout");
//   redirect("/success");
// }

// // MARK: Signout 
// export async function signout() {
//   // const supabase = createClient();
//   const { error } = await supabase.auth.signOut();
//   if (error) {
//     // console.log(error);
//     redirect("/error");
//   }

//   redirect("/");
// }

// // MARK: SignInWithGoogle
// export async function signInWithGoogle() {
//   // const supabase = createClient();
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "google",
//     options: {
//       queryParams: {
//         access_type: "offline",
//         prompt: "consent",
//       },
//     },
//   });

//   if (error) {
//     // console.log(error);
//     redirect("/error");
//   }

//   redirect(data.url);
// }
// // MARK: SignInWithGithub

// export async function signInWithGithub() {
//   // const supabase = createClient();
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: "github",
//     options: {
//       queryParams: {
//         scope: "user:email", // 请求 GitHub 用户的 email 权限
//       },
//     },
//   });

//   if (error) {
//     // console.log(error);
//     redirect("/error");
//   }

//   redirect(data.url); // 跳转到 GitHub OAuth 登录页面
// }