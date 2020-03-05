---
sideEffort: False
tags:
  - tag A
  - tag B
---
# GetUserById

## Query

```sql template
SELECT
  `id`,
  `name`
FROM `users`
WHERE `id` = :id;
```

## Schema

### Input

```yaml input-schema
title: Input User Id for GetUserById
type: object
properties:
  id:
    description: User Id
    type: integer
additionalProperties: false
required:
  - id
```

#### Default

```yaml
id: 1
```

### Output

```yaml output-schema
title: Output User Data for GetUserById
type: object
properties:
  id:
    description: User Id
    type: integer
  name:
    description: User Name
    type: string
additionalProperties: false
required:
  - id
  - name
```
