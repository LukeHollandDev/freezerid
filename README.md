# Freezer ID

Website which will allow users to tag each of their freezer items (such as frozen meals) and keep them itemised in a sleek online system.

### Design

Light Mode Palette:

| Color           | Code       | Usage                                            | Example                                        |
|-----------------|------------|--------------------------------------------------|------------------------------------------------|
| Background      | #F0F8FF    | Overall background or main content areas         | Pale Ice Blue Background: image_link_for_pale_ice_blue |
| Main Text       | #212529    | Primary text content                             | Dark Gray Text: image_link_for_dark_gray |
| Secondary Text  | #546E7A    | Secondary text, captions, labels                 | Mid-Gray Text: image_link_for_mid_gray |
| Headers         | #BCE1F2    | Headings, titles, section dividers               | Iceberg Blue Headers: image_link_for_iceberg_blue |
| Buttons         | #7CC3FC    | Calls to action, primary buttons                 | Glacier Blue Buttons: image_link_for_glacier_blue |
| Highlights      | #E9F5FE    | Hover effects, selected elements, subtle accents | Light Blue Highlights: image_link_for_light_blue |
| Borders         | #E5E0D9    | Element borders, subtle separations              | Off-White Borders: image_link_for_off_white |


Dark Mode Palette:

| Color           | Code       | Usage                                            | Example                                        |
|-----------------|------------|--------------------------------------------------|------------------------------------------------|
| Background      | #27496D    | Overall background                               | Navy Blue Background: image_link_for_navy_blue |
| Main Text       | #F2E8CF    | Primary text content                             | Off-White Text: image_link_for_off_white |
| Secondary Text  | #A5B4C2    | Secondary text, captions, labels                 | Light Gray Text: image_link_for_light_gray |
| Headers         | #7CC3FC    | Headings, titles, section dividers               | Glacier Blue Headers: image_link_for_glacier_blue |
| Buttons         | #E5E0D9    | Calls to action, primary buttons                 | Off-White Buttons: image_link_for_off_white |
| Highlights      | #546E7A    | Hover effects, selected elements, subtle accents | Mid-Gray Highlights: image_link_for_mid_gray |
| Borders         | #212529    | Element borders, subtle separations              | Dark Gray Borders: image_link_for_dark_gray |


### Features

* Accounts
  * Login via Google and other providers
  * Maybe Username/Password also
* List of freezer items
  * Each item consists of;
    * identifier
    * name
    * description
    * time added
    * tags
* Allow sorting freezer items based on any of the fields
* Allow grouping freezer items based on tags

Extra nice to have features

* Freezer item photo for better identification

### Technologies

* **NextJS** - Powers both the frontend and backend for efficient development.
* **PostgreSQL** - Handles the database operations, ensuring robust data management.
* **Docker** - Facilitates containerization, streamlining deployment and scalability processes.
