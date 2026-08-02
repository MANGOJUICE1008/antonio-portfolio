# Editing your projects

Open `projects.csv` in Excel, Numbers, or Google Sheets. Each row is one
project. Add a row to add a project, delete a row to remove one, save as
CSV, and it'll pick up next time the site builds/starts.

## Columns

| Column         | Values                          | Notes |
|----------------|----------------------------------|-------|
| Status         | `Present`, `Past`, or `Future`   | Present = active now, Past = completed, Future = planned |
| Start Date     | `MM/YYYY`, e.g. `05/2024`        | Optional |
| End Date       | `MM/YYYY`                        | Optional — leave blank if it's ongoing |
| Title          | free text                        | Required |
| Description    | free text                        | Required. Wrap in quotes if it contains a comma — Excel does this for you automatically when you save as CSV |
| Highlights     | bullet points separated by `;`   | Optional, e.g. `Cut costs 20%;Shipped 3 weeks early` |
| Tags           | tools/tech separated by `;`      | e.g. `Altium;Simulink;Solidworks` |
| Featured       | `Yes` or `No`                    | `Yes` makes it show up on the home page |
| PDF Filename   | e.g. `fsae-report.pdf`           | Optional. The actual PDF must be placed in `public/project-files/` with this exact filename |

## Applying changes

Run:

```
npm run manifest:projects
```

This regenerates `src/app/projects/manifest.json` from the CSV. It also
runs automatically before `npm run dev` and `npm run build`, so a normal
restart picks up your edits too.

If a row has a typo (bad date, unrecognized status, missing PDF), the
script prints a warning in the terminal telling you exactly which row and
what's wrong — it won't break the build, it just skips or falls back
sensibly for that one field.
