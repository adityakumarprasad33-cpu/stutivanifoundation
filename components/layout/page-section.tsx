import * as React from "react"
import { Section } from "./section"
import { Container } from "./container"
import { PageHeader } from "./page-header"
import { PageContent } from "./page-content"

interface PageSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  headerActions?: React.ReactNode;
  containerClassName?: string;
  headerClassName?: string;
}

const PageSection = React.forwardRef<HTMLElement, PageSectionProps>(
  ({ className, containerClassName, headerClassName, title, description, headerActions, children, ...props }, ref) => {
    return (
      <Section ref={ref} className={className} {...props}>
        <Container className={containerClassName}>
          {(title || description || headerActions) && (
            <PageHeader 
              title={title || ""} 
              description={description} 
              actions={headerActions}
              className={headerClassName}
            />
          )}
          {children && <PageContent>{children}</PageContent>}
        </Container>
      </Section>
    )
  }
)
PageSection.displayName = "PageSection"

export { PageSection }
