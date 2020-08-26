# Caching Service

How to use

```ts
import { Cacheable, CacheClear } from '@type-cacheable/core';


class MyService {
    @Cacheable((args: any[]) => args[0], ttl:TtlSeconds.ONE_MINUTE)
    public get(id:number): SomeModel{
    }

    @CacheClear((args: any[]) => (args[0] as SomeModel).id)
    public update(model:SomeModel): void{

    }

    @CacheClear((args: any[]) => args[0])
    public delete(id:number): void{

    }
}
```
