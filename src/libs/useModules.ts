import _ from 'lodash-es'

const moduleCtx: any = {}

export default {
  install: (app: any) => {
    _.chain(import.meta.glob<{ install: any }>('../modules/*.ts', { eager: true }))
      .sortBy('step')
      .map((o: { name: string; install: (arg0: any) => void }) => {
        const moduleContext = o.install({ app, ...moduleCtx })
        if (o.name)
          moduleCtx[o.name] = moduleContext

        return moduleContext
      })
      .value()
  },
}
