'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from './ui/breadcrumb';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment);
  

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const displayName = segment.charAt(0).toUpperCase() + segment.slice(1); // Capitalize

    return (
        <BreadcrumbItem key={index} className="hidden md:block">
            <BreadcrumbLink href={href}>{displayName}</BreadcrumbLink>
            {index < pathSegments.length - 1 && <span> / </span>} 
        </BreadcrumbItem>
    );
  });

  if(pathSegments.length === 0) return <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem></BreadcrumbList></Breadcrumb>
  return <Breadcrumb><BreadcrumbList>{breadcrumbs}</BreadcrumbList></Breadcrumb>;
};

export default Breadcrumbs;