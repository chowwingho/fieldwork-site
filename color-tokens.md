# Color Tokens — ManyroadsV2.jsx

## Light Mode

### Backgrounds
| Hex         | Usage                                              |
|-------------|-----------------------------------------------------|
| `#FAF9F6`   | Page background, navbar background                  |
| `#F0EEE6`   | Card fills (pathway cards, tech badges), dark toggle hover |
| `#E8E6DD`   | Primary button fill, footer CTA button fill, typewriter button fill |
| `#D1CFC6`   | Pathway card button fill                            |

### Text
| Hex         | Usage                                              |
|-------------|-----------------------------------------------------|
| `#262625`   | Primary text (headings, body, section labels, logo, button text, service numbers) |
| `#888888`   | Muted text (nav links, descriptions, stats desc, LinkedIn links, footer labels, dark toggle text) |
| `white`     | Footer text (headings, links, contact, wordmark)    |

### Borders
| Hex              | Usage                                         |
|------------------|------------------------------------------------|
| `#262625` / 12%  | Section dividers, service card borders, team dividers, credibility dividers, dark toggle border |

### Button Hover States
| Hex         | Usage                                              |
|-------------|-----------------------------------------------------|
| `#DEDAD0`   | Primary button hover, footer CTA button hover, typewriter button hover |
| `#C5C3BA`   | Pathway card button hover                           |

### Footer-Specific
| Hex            | Usage                                           |
|----------------|--------------------------------------------------|
| `#262625`      | Footer background                                |
| `white` / 60%  | Footer subtitle text                             |
| `white` / 15%  | Footer horizontal divider                        |

---

## Dark Mode

### Backgrounds
| Hex         | Usage                                              |
|-------------|-----------------------------------------------------|
| `#1A1A18`   | Page background, navbar background                  |
| `#262624`   | Card fills (pathway cards, tech badges), dark toggle hover |
| `#333331`   | Primary button fill, footer CTA button fill, typewriter button fill |
| `#3D3D3A`   | Pathway card button fill                            |
| `#111110`   | Footer background                                  |

### Text
| Hex              | Usage                                         |
|------------------|------------------------------------------------|
| `#ECECEA`        | Primary text (headings, body, section labels, logo, button text) |
| `#ECECEA` / 50%  | Muted text (nav links, descriptions, stats desc, LinkedIn links, dark toggle text) |
| `white`          | Footer text (headings, links, contact, wordmark) |

### Borders
| Hex              | Usage                                         |
|------------------|------------------------------------------------|
| `#ECECEA` / 10%  | Section dividers, service card borders, team dividers, credibility dividers, dark toggle border |

### Button Hover States
| Hex         | Usage                                              |
|-------------|-----------------------------------------------------|
| `#3D3D3A`   | Primary button hover, footer CTA button hover, typewriter button hover |
| `#4A4A47`   | Pathway card button hover                           |

### Footer-Specific
| Hex            | Usage                                           |
|----------------|--------------------------------------------------|
| `#111110`      | Footer background                                |
| `white` / 60%  | Footer subtitle text                             |
| `white` / 15%  | Footer horizontal divider                        |

---

## Accent Scale

Brand green accent with 5 functional tokens. Dark mode variants are lighter to maintain contrast on dark backgrounds.

### Light Mode
| Token                  | Hex       | Usage                                              |
|------------------------|-----------|----------------------------------------------------|
| `--mr-accent-subtle`   | `#E7ECE3` | Selected row bg, tag backgrounds, tinted cards     |
| `--mr-accent-default`  | `#3D7A41` | Links, active nav indicators, // markers, primary CTAs |
| `--mr-accent-hover`    | `#336737` | Hover state on accent buttons/links                |
| `--mr-accent-active`   | `#2B572E` | Pressed/active state                               |
| `--mr-accent-on`       | `#FFFFFF` | Text on filled accent backgrounds                  |

### Dark Mode
| Token                  | Value                        | Usage                          |
|------------------------|------------------------------|--------------------------------|
| `--mr-accent-subtle`   | `rgba(61, 122, 65, 0.12)`   | Tinted selection on dark bg    |
| `--mr-accent-default`  | `#6F9C72`                    | Links, indicators on dark bg   |
| `--mr-accent-hover`    | `#5E8B61`                    | Hover on dark bg               |
| `--mr-accent-active`   | `#4E7A51`                    | Pressed on dark bg             |
| `--mr-accent-on`       | `#FFFFFF`                    | Text on filled accent bg       |

### Contrast Ratios
| Pair                                        | Ratio  | Pass |
|---------------------------------------------|--------|------|
| `--mr-accent-default` light (#3D7A41) vs page (#FAF9F6) | 4.91:1 | AA   |
| `--mr-accent-default` dark (#6F9C72) vs page (#1A1A18)  | 5.54:1 | AA   |
| `--mr-accent-on` (#FFF) vs default (#3D7A41)            | 5.17:1 | AA   |

---

## Summary — Unique Hex Values

| Light         | Dark          | Role                    |
|---------------|---------------|-------------------------|
| `#FAF9F6`     | `#1A1A18`     | Page / navbar bg        |
| `#F0EEE6`     | `#262624`     | Card fills / badges     |
| `#E8E6DD`     | `#333331`     | Primary button fill     |
| `#D1CFC6`     | `#3D3D3A`     | Pathway button fill     |
| `#DEDAD0`     | `#3D3D3A`     | Primary button hover    |
| `#C5C3BA`     | `#4A4A47`     | Pathway button hover    |
| `#262625`     | `#ECECEA`     | Primary text            |
| `#888888`     | `#ECECEA`/50% | Muted text              |
| `#262625`/12% | `#ECECEA`/10% | Borders                 |
| `#262625`     | `#111110`     | Footer bg               |
