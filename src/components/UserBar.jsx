import React from "react";
const UserBar = () => {
    return (
        <div className="flex flex-row gap-4 items-center py-2 px-4 border border-white hover:border-gray-200 rounded">
            <div className="rounded-full overflow-hidden h-10 w-10 object-cover">
                <img
                    src={"https://picsum.photos/seed/picsum/200/300"}
                    alt="Avatar"
                />
            </div>
            <div className="flex flex-col items-center">
                <span className="text-sm">John Doe</span>
                <span className="text-xs font-medium">Doctor</span>
            </div>
        </div>
    );
};

export default UserBar;
