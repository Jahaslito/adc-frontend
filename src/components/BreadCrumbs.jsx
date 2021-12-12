import React from "react";
import { Link } from "react-router-dom";
import useReactRouterBreadcrumbs from "use-react-router-breadcrumbs";
import { MdOutlineChevronRight } from "react-icons/md";
import { colors } from "../assets/colors/colors";

const BreadCrumbs = () => {
    const routes = [
        { path: "/", breadcrumb: "Dashboard" },
        { path: "/doctor", breadcrumb: "Diagnosis and Prescription" },
        { path: "/vitals", breadcrumb: "Vital Signs" },
        { path: "/doctor", breadcrumb: "Diagnosis and Prescription" },
        { path: "/appoint", breadcrumb: "Appointments" },
        { path: "/patients", breadcrumb: "Patients" },
        { path: "/research", breadcrumb: "Research" },
        { path: "/lab", breadcrumb: "Laboratory" },
    ];
    const breadcrumbs = useReactRouterBreadcrumbs(routes);
    return (
        <div className="w-8/12 p-3 text-xs font-medium text-gray-600 flex flex-row items-center gap-2">
            {breadcrumbs.map(({ match, breadcrumb }, key) =>
                key + 1 === breadcrumbs.length ? (
                    <span key={key}>{breadcrumb}</span>
                ) : (
                    <React.Fragment key={key}>
                        <Link to={match.pathname}>{breadcrumb}</Link>
                        <MdOutlineChevronRight
                            size={16}
                            color={colors.primary}
                        />
                    </React.Fragment>
                )
            )}
        </div>
    );
};

export default BreadCrumbs;
