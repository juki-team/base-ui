```Bash
grep -rnE "^import [^t].*['\"].*types.*['\"]" ./src
```

```Bash
find ./src -type f -name "*.ts*" -exec sed -i '' "s|import { ImageProps } from './types'|import type { ImageProps } from './types'|" {} +
```

```bash
find ./src -type f -name "*.ts*" -exec sed -i '' "s|import { IconProps } from '../../types';|import type { IconProps } from '../../types';|" {} +
```

```bash
find ./src -type f -name "*.ts*" -exec sed -i '' "s|import { BasicIconProps } from '../types';|import type { BasicIconProps } from '../types';|" {} +
find ./src -type f -name "*.ts*" -exec sed -i '' "s|import { SignIconProps } from '../../types';|import type { SignIconProps } from '../../types';|" {} +
find ./src -type f -name "*.ts*" -exec sed -i '' "s|import { RootIconProps } from '../../types';|import type { RootIconProps } from '../../types';|" {} +
```
