import { cn } from "../../../common/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../../common/ui/breadcrumb";

const CustomBreakcrumb = ({
  breadcrumbTitle,
  breadcrumbValue,
  className,
}: {
  breadcrumbTitle: string;
  breadcrumbValue?: string[];
  className?: string;
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className={cn(className)}>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={`/${breadcrumbTitle.toLowerCase()}`}>
            {breadcrumbTitle}{" "}
            {breadcrumbValue?.length ? `(${breadcrumbValue.length})` : null}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreakcrumb;
