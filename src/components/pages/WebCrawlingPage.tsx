import { DocsLayout } from "@/components/DocsLayout";

const navigation = [
  {
    title: "Overview",
    items: [
      { title: "Showcase", href: "/showcase" },
      { title: "Onboarding process", href: "/onboarding" },
      { title: "Kapa FAQ", href: "/faq" }
    ]
  },
  {
    title: "Connecting Data Sources",
    items: [
      { title: "Web Crawling", href: "/web-crawling", isActive: true },
      { title: "Custom Answers", href: "/custom-answers" },
      { title: "GitHub", href: "/github" },
      { title: "Community discussion", href: "/community" },
      { title: "Knowledge bases", href: "/knowledge-bases" },
      { title: "Ticketing systems", href: "/ticketing" },
      { title: "Files, API specs, other", href: "/files" },
      { title: "Data sources FAQ", href: "/data-sources-faq" }
    ]
  },
  {
    title: "Deploying Kapa",
    items: [
      { title: "Setup", href: "/setup" },
      { title: "Configuration", href: "/configuration" }
    ]
  },
  {
    title: "Analyzing Conversations",
    items: [
      { title: "Analytics", href: "/analytics" },
      { title: "Feedback", href: "/feedback" }
    ]
  },
  {
    title: "Improving Kapa",
    items: [
      { title: "Best practices", href: "/best-practices" },
      { title: "Optimization", href: "/optimization" }
    ]
  }
];

const tableOfContents = [
  { title: "Prerequisites", href: "#prerequisites", level: 1 },
  { title: "Data ingested", href: "#data-ingested", level: 1 },
  { title: "Setup", href: "#setup", level: 1 },
  { title: "Step 1: Crawling", href: "#step-1-crawling", level: 2 },
  { title: "Step 2: Parsing", href: "#step-2-parsing", level: 2 },
  { title: "Best practices", href: "#best-practices", level: 1 },
  { title: "Optimizing your crawl", href: "#optimizing-crawl", level: 2 },
  { title: "Multiple start URLs", href: "#multiple-urls", level: 2 },
  { title: "Common crawling patterns", href: "#crawling-patterns", level: 2 },
  { title: "Documentation sites", href: "#documentation-sites", level: 2 },
  { title: "Blog platforms", href: "#blog-platforms", level: 2 },
  { title: "Forums and community sites", href: "#forums", level: 2 },
  { title: "Troubleshooting", href: "#troubleshooting", level: 1 }
];

const WebCrawlingPage = () => {
  return (
    <DocsLayout navigation={navigation} tableOfContents={tableOfContents}>
      <div className="space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-muted-foreground">
          <span>🏠</span>
          <span className="mx-2">›</span>
          <span>Connecting Data Sources</span>
          <span className="mx-2">›</span>
          <span className="text-primary">Web Crawling</span>
        </nav>

        {/* Main heading */}
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Web Crawling</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Kapa provides a specialized web scraper designed for extracting data from public websites. It allows you to ingest 
            documentation, tutorials, blogs, and other web content into Kapa.
          </p>
        </div>

        {/* Prerequisites section */}
        <section id="prerequisites">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Prerequisites</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>URLs of the websites you want to crawl</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Basic understanding of CSS selectors (for defining which content to extract)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Access to the Kapa platform</span>
            </li>
          </ul>
        </section>

        {/* Data ingested section */}
        <section id="data-ingested">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Data ingested</h2>
          <p className="text-muted-foreground mb-4">
            When you connect Kapa to websites using Web Crawling, the following data is ingested:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Page URLs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Page titles and full content (converted to markdown)</span>
            </li>
          </ul>
        </section>

        {/* Setup section */}
        <section id="setup">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Setup</h2>
          <p className="text-muted-foreground mb-6">
            Setting up web crawling involves two main steps: crawling the website to discover pages and parsing the content from those pages.
          </p>

          <div id="step-1-crawling" className="mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-3">Step 1: Crawling</h3>
            <p className="text-muted-foreground">
              Configure the crawler to discover and index pages from your target website. This step involves setting up start URLs, 
              crawl depth, and filtering rules to ensure only relevant content is processed.
            </p>
          </div>

          <div id="step-2-parsing">
            <h3 className="text-xl font-semibold text-foreground mb-3">Step 2: Parsing</h3>
            <p className="text-muted-foreground">
              Define CSS selectors and parsing rules to extract the specific content you want from each page. This ensures that 
              only the relevant information is ingested into your knowledge base.
            </p>
          </div>
        </section>

        {/* Best practices section */}
        <section id="best-practices">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Best practices</h2>
          
          <div className="space-y-6">
            <div id="optimizing-crawl">
              <h3 className="text-lg font-semibold text-foreground mb-2">Optimizing your crawl</h3>
              <p className="text-muted-foreground">
                To get the best results from web crawling, consider the website structure and implement appropriate filtering 
                to avoid crawling irrelevant pages.
              </p>
            </div>

            <div id="multiple-urls">
              <h3 className="text-lg font-semibold text-foreground mb-2">Multiple start URLs</h3>
              <p className="text-muted-foreground">
                Use multiple starting points when crawling large websites or when you need to target specific sections 
                of a website.
              </p>
            </div>

            <div id="crawling-patterns">
              <h3 className="text-lg font-semibold text-foreground mb-2">Common crawling patterns</h3>
              <p className="text-muted-foreground mb-3">
                Different types of websites require different crawling strategies:
              </p>

              <div className="space-y-4 ml-4">
                <div id="documentation-sites">
                  <h4 className="font-medium text-foreground">Documentation sites</h4>
                  <p className="text-sm text-muted-foreground">
                    Focus on main content areas and avoid navigation elements.
                  </p>
                </div>

                <div id="blog-platforms">
                  <h4 className="font-medium text-foreground">Blog platforms</h4>
                  <p className="text-sm text-muted-foreground">
                    Target article content and exclude sidebar widgets.
                  </p>
                </div>

                <div id="forums">
                  <h4 className="font-medium text-foreground">Forums and community sites</h4>
                  <p className="text-sm text-muted-foreground">
                    Extract discussion threads while filtering out user profiles and advertisements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting section */}
        <section id="troubleshooting">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Troubleshooting</h2>
          <p className="text-muted-foreground">
            If you encounter issues with web crawling, check your CSS selectors, verify that the target website allows 
            automated access, and ensure your crawling parameters are correctly configured.
          </p>
        </section>
      </div>
    </DocsLayout>
  );
};

export default WebCrawlingPage;