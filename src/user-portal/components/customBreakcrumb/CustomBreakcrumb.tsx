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
}: {
  breadcrumbTitle: string;
  breadcrumbValue?: string[];
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">
            {breadcrumbTitle}{" "}
            {breadcrumbValue?.length ? `(${breadcrumbValue.length})` : null}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreakcrumb;
