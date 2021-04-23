```
                                    RANCHBOY
                                    ⎺⎺⎺⎺⎺⎺⎺⎺
         Connects to your Rancher2 nodes and pods easily from the CLI.

  By running the command `ranchboy` alone, you will access an interactive mode.
        This mode is also available when some parameters are not defined.

┏━━━━━━━━┓
┃ Config ┃
┠────────┺━━━━━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Configure your rancher credentials │ ranchboy --config                       ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━┓
┃ Logs ┃
┠──────┺━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Read the logs of the pod           │ ranchboy <cluster> <node> <pod> --logs  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━┓
┃ Shell ┃
┠───────┺━━━━━━━━━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ Open an SSH connection to the node │ ranchboy <cluster> <node> --shell       ┃
┃ Open a shell in the pod            │ ranchboy <cluster> <node> <pod> --shell ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

             All the clusters, nodes and pods names can be partial.
```
