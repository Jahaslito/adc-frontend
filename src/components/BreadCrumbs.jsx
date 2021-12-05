import React from "react";
import { Link } from "react-router-dom";
import useReactRouterBreadcrumbs from "use-react-router-breadcrumbs";
import { MdOutlineChevronRight } from "react-icons/md";
import { colors } from "../assets/colors/colors";

const BreadCrumbs = () => {
    const routes = [
        { path: "/", breadcrumb: "Dashboard" },
        { path: "/doctor", breadcrumb: "Doctor" },
    ];
    const breadcrumbs = useReactRouterBreadcrumbs(routes);
    return (
        <div className="w-8/12 p-3 text-xs font-medium text-gray-600 flex flex-row items-center gap-2">
            {breadcrumbs.map(({ match, breadcrumb }, key) =>
                key + 1 === breadcrumbs.length ? (
                    <span key={key}>{breadcrumb}</span>
                ) : (
                    <>
                        <Link key={key} to={match.pathname}>
                            {breadcrumb}
                        </Link>
                        <MdOutlineChevronRight
                            size={16}
                            color={colors.primary}
                        />
                    </>
                )
            )}
        </div>
    );
};

export default BreadCrumbs;
