# Website review and rebuild

The previous site gave visitors reasons to doubt the business before they could contact it. The problem was in the pages themselves, not a lack of review widgets.

## Findings and changes

| Finding                                                                                                                                                                      | Why it mattered                                                                                     | Change                                                                                                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Navigation led with the unexplained abbreviation “MRS.”                                                                                                                      | Visitors had to work to identify the business.                                                      | Use Multifamily Rehab Specialists throughout navigation, page metadata, and business markup.                                                                                                                      |
| Repeated 1,000+ unit, 48-hour bid, licensing, fixed-price, and owner-on-every-site claims had no supporting material in the repository. Bid timing also contradicted itself. | Unsupported precision felt like template filler and created expectations the business may not meet. | Remove those assertions. Explain scope, access, scheduling, changes, and handoff in concrete language.                                                                                                            |
| Anonymous testimonials were duplicated in five-star review markup.                                                                                                           | Presenting unverified endorsements to visitors and search engines undermines trust.                 | Remove testimonials, ratings, review schema, and the animated claims ticker.                                                                                                                                      |
| Example projects had names and unit counts, but every detail page was a “Coming Soon” screen.                                                                                | The supposed evidence disappeared as soon as a visitor clicked.                                     | Replace the invented portfolio with an explicitly labeled visual scope guide. Redirect the six old example URLs; return 404 for unknown project URLs.                                                             |
| About page had a missing owner photo and an unsupported biography.                                                                                                           | A placeholder person made the company feel unfinished.                                              | Replace it with the actual renovation focus and the working details customers should discuss. No invented name or history.                                                                                        |
| Phone number disappeared from the header below extra-wide desktop sizes.                                                                                                     | Calling was harder than filling a lengthy form.                                                     | Prominent click-to-call actions, a phone link in the header, and a fixed mobile call bar. Shorten the optional inquiry form.                                                                                      |
| Contact API returned success when no email was configured; the inquiry was only logged.                                                                                      | Leads could be lost while customers believed the business had received them.                        | Read email availability at request time. Display a call/email fallback when unavailable. Return 503 instead of success. Only confirm delivery after the provider accepts the email. Keep entered text on failure. |
| Invalid JSON/types could crash the API, and user-entered HTML was inserted in email.                                                                                         | Failed requests and damaged inquiry emails were avoidable.                                          | Validate input, bound payload size, escape email content, reject cross-origin requests, and add a honeypot. Remove personal-data debug logging.                                                                   |
| Service/area/article headings used white text on a pale background. Scroll reveals hid content pending JavaScript.                                                           | Important content was hard to read or absent.                                                       | Rebuild shared layouts with readable contrast; content stays visible without animation. Add keyboard focus, skip navigation, and reduced-motion support.                                                          |
| Service/article links pointed to service routes that did not exist.                                                                                                          | Visitors and crawlers hit dead ends in the middle of useful content.                                | Link to the six maintained service pages and retain the existing service URL structure.                                                                                                                           |
| Cost guide contained unsupported costs, rent lifts, and inconsistent payback arithmetic. Location copy asserted market numbers without sources.                              | These claims could mislead an owner making a budget decision.                                       | Replace with a practical scope/budget guide and property-planning information for each service area.                                                                                                              |
| Multiple business schemas, an unconfirmed street address, fake ratings, and a missing social-sharing image.                                                                  | Search engines received inconsistent or unsupported business information.                           | Centralize the business identity, use one business entity with linked service markup, omit the unconfirmed street address and hours, add real share-card/favicon assets.                                          |
| Sitemap gave every page a new modification date on every build.                                                                                                              | Build time was being presented as fresh content.                                                    | Keep a clean sitemap of actual pages without invented modification dates.                                                                                                                                         |

## Visual and conversion direction

Warm paper backgrounds, dark green, restrained typography, licensed self-hosted fonts, and existing image assets replace the loud claim ticker and repetitive badges. The copy talks to apartment owners and managers about their property. Calling is the primary action. Scope, process, coverage, and FAQs support that action rather than competing with it.

Images already in the repository are reused as visual references. Ownership, project names, dates, and counts have not been verified, so the site does not label these as completed named jobs. The existing phone number and email address are retained; neither has been independently verified as reachable.

## SEO scope

The site now has descriptive service/location titles, one visible primary heading per page, canonical URLs, matching structured data, natural internal links, an actual social-sharing card, and a crawlable sitemap. Existing main service, area, and guide URLs are preserved. Unsupported review markup and meta-keyword filler are removed.

An exact-match or descriptive domain can help visitors understand the service. It does not establish a top-ten ranking. This work improves the site's relevance, usability, and crawlability; live indexing, rankings, Search Console data, and production Core Web Vitals were not measured. Fifteen area pages describe coverage from Houston, not fictitious branch offices.

## Email and deployment

There is no configured Resend key in this environment. Calling and email links work without it; the online form intentionally shows a contact alternative until delivery is configured. To enable server-side inquiries in the deployment, configure `RESEND_API_KEY`, verify the sending domain with Resend, and use an authorized `FROM_EMAIL`. `CONTACT_EMAIL` can override the existing recipient. Keep values in secure deployment settings, never in source control. A real delivery check to the business inbox remains necessary once configured.

The contact page is rendered on the server so availability is checked at request time. The rest of the content is prerendered through the existing Astro/Vercel adapter. No production deployment, DNS changes, or real email sends were performed.

## Development and checks

Use the existing checkout at `/workspace/Saadi-Construction` and the prepared Node 22 runtime:

```sh
export PATH=/workspace/.tools/node22/node_modules/.bin:$PATH
npm ci
npm run dev -- --host 0.0.0.0 --port 4321
npm run build
npm test
```

The automated tests exercise inquiry validation, delivery failure, missing configuration, response semantics, field mapping, and HTML escaping. They use a fake delivery function and never send customer email. Browser verification also checks the actual pages, mobile navigation, responsive layouts, contact fallback, link targets, images, and metadata. These checks demonstrate development behavior; they are not evidence of live lead delivery or search rankings.

## Validation completed

- Production Astro/Vercel build on Node 22.
- 14 passing inquiry regression tests; none skipped.
- 29 sitemap pages return successfully with a single document H1, descriptions, canonical URLs, and parseable structured data.
- 29 internal link destinations and 8 image request URLs checked successfully.
- 145 page/viewport combinations checked at widths 320, 390, 768, 1024, and 1440 pixels, with no horizontal overflow.
- Mobile menu opening/Escape, FAQ disclosure, call targets, missing-email fallback, old project redirects, and unknown-project 404 verified.
- Actual inquiry component tested with simulated delivery: validation focus, pending state, retained text on failure, call alternative, confirmed success, and reset. No email sent.
- Content and mobile navigation checked with JavaScript disabled.
- Browser crawl reported no JavaScript errors, failed page/asset responses, or external resource requests.
