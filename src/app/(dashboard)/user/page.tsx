import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import { Link } from "lucide-react";
export default async function UsersPage(){
    const users = await prisma.user.findMany();

    return (
        <div>
        <Breadcrumb pageName="User" />
<div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    {/* <Link className="bg-primary text-white px-4 py-2 mb-3 inline-block rounded-md" href="/us/create">
   Add Users
    </Link> */}
  <div className="max-w-full overflow-x-auto">
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
            Name
          </th>
          <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
            Email
          </th>
          <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
            Phone Number
          </th>
          <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
            Role
          </th>
          <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
            Created date
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, key) => (
          <tr key={key}>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                {user.name}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                {user.email}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                {user.phoneNumber}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
              <h5 className="font-medium text-black dark:text-white">
                {user.roles}
              </h5>
            </td>
            <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
              <p className="text-black dark:text-white">
                {dayjs(user.createdAt).format("DD MMMM YYYY")}
              </p>
            </td>
           
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
</div>
)
    
}
