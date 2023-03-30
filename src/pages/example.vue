<script lang="jsx">
export default {
  name: 'Example',
  data() {
    return {
      search: {
        searchLineNum: 3, //默认一行几个 可以配合columns中的searchLineNum
        value: { descript: '初始数据' }, //初始值
        upDown: false //默认收起
      },
      cascader_data: [
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        }
      ],
      datas: [],
      count: 0
    }
  },
  computed: {
    config() {
      return {
        form: {
          labelPosition: 'right',
          formLineNum: 3,
          modalWidth: 70,
          value: { createUser10: 'gg' }
        },
        table: {
          onOnRowDblclick: this.tableRowClick
        },
        toolBarActions: [
          'new',
          {
            key: 'test',
            renderItem: () => {
              return (
                <Button
                  type="primary"
                  onclick={() => {
                    this.$Message.info('自定义按钮操作')
                  }}
                >
                  {this.$t('example.custom')}
                </Button>
              )
            }
          },
          'fullscreen',
          'refresh',
          'rowSetting'
        ],
        format: {
          // formatCurrent({ page }) {
          //   const { current, pageSize } = page;
          //   return { ...page, current: (current - 1) * pageSize };
          // }
          formatCurrent: '(page.current - 1) * page.pageSize'
        },
        columns: [
          {
            title: this.$t('example.descript'),
            group: '分组A',
            tooltip: true,
            tooltipMaxWidth: 700,
            key: 'descript',
            renderTable: {
              type: 'span',
              useExp: true,
              text: "value===200?'成功':'失败';console.log(value);",
              style: {
                color: "value==200?'#19be6b':'#ed4014'"
              }
            },
            renderForm: {
              type: 'i-input',
              props: {
                type: 'textarea',
                rows: 4
              }
            },
            formLineNum: 2
          },
          {
            title: this.$t('example.is'),
            group: '分组A',
            key: 'cataLog',
            disabled: true,
            renderSearch: {
              type: 'Radio'
            },
            renderForm: {
              type: 'DatePicker',
              props: {
                placeholder: 'lastDate',
                format: 'yyyy-MM-dd hh:mm:ss'
              },
              format(value) {
                return value ? dayjs(value).format('YYYY-MM-DD hh:mm:ss') : ''
              }
            },
            renderTable: () => {
              return (
                <Button
                  onclick={() => {
                    console.log('aaa')
                  }}
                >
                  aaa
                </Button>
              )
            }
          },
          {
            title: this.$t('example.createUser'),
            group: '分组B',
            key: 'createUser',
            renderSearch: ({ value, input }) => {
              return (
                <Select value={value} oninput={input} clearable>
                  <Option value="1">1</Option>
                </Select>
              )
            }
          },
          {
            title: '长度',
            group: '分组A',
            disabled: true,
            renderSearch: {
              type: 'Slider'
            },
            renderForm: {
              type: 'DatePicker',
              style: {
                width: '100%'
              }
            },
            renderTable: (h, params) => {
              return <span>{params.row.isAllow === 'F' ? '黑名单' : '白名单'}</span>
            },
            key: 'createUser2'
          },
          {
            title: '数字',
            renderSearch: {
              type: 'InputNumber'
            },
            renderForm: {
              type: 'i-switch'
            },
            key: 'createUser8'
          },
          {
            title: '城市',
            notShowTable: true,
            renderForm: {
              type: 'Select',
              children: []
            },
            renderSearch: () => {
              return <Cascader data={this.cascader_data} clearable></Cascader>
            },
            key: 'city'
          },
          {
            title: 'creat4',
            notShowTable: true,
            notShowSearch: true,
            rules: [
              {
                required: true,
                message: 'creat4不能为空'
              }
            ],
            renderForm: {
              type: 'Cascader',
              props: {
                value: [],
                data: [
                  {
                    value: 'beijing',
                    label: '北京',
                    children: [
                      {
                        value: 'gugong',
                        label: '故宫'
                      },
                      {
                        value: 'tiantan',
                        label: '天坛'
                      },
                      {
                        value: 'wangfujing',
                        label: '王府井'
                      }
                    ]
                  }
                ]
              }
            },
            key: 'createUs3er4'
          },

          {
            title: '百分比',
            key: 'percent',
            notShowSearch: true,
            renderTable({ row }) {
              return (
                <div class="p-5">
                  <Circle percent={row.percent} size={80}>
                    <span class="demo-Circle-inner" style="font-size:14px">
                      {row.percent}%
                    </span>
                  </Circle>
                </div>
              )
            }
          },
          {
            title: '操作',
            key: 'action',
            actions: [
              {
                title: '新增示例',
                type: 'new'
              },
              {
                type: 'edit',
                title: '编辑示例',
                request: '/api/users/${id}',
                method: 'POST'
              },

              {
                title: '阻止默认',
                prevent: true,
                action: params => {
                  this.$Message.info({
                    content: `用户是${params.row.createUser}`
                  })
                }
              },
              {
                title: '手动打开编辑',
                prevent: true,
                action: params => {
                  //可以修改数据后传入
                  params.row.descript = 300
                  this.$refs.table.typeAction({ type: 'edit' }, params)
                }
              },
              {
                title: '自定义请求',
                method: 'POST',
                type: 'edit',
                request(options) {
                  return axios.post('http://192.168.0.38:3000/mock/67/sys/sysOptionList', {
                    a: options.row.cateLog
                  })
                }
              },
              {
                type: 'delete',
                title: '普通删除',
                request: 'http://192.168.0.38:3000/mock/106/api/table/',
                method: 'DELETE'
              },

              {
                type: 'delete',
                title: '链接带参删除',
                request: 'http://192.168.0.38:3000/mock/106/api/table/${id}',
                method: 'DELETE'
              },
              {
                title: '请求体带参删除',
                type: 'delete',
                request: 'http://192.168.0.38:3000/mock/106/api/table',
                method: 'DELETE',
                keys: ['id']
              }
            ]
          }
        ],
        request: 'http://192.168.0.38:3000/mock/106/api/table',
        map: {
          dataPath: 'data',
          totalPath: 'totalRows',
          message: 'message'
        },
        submitForm: 'http://192.168.0.38:3000/mock/106/api/test'
      }
    }
  },
  methods: {
    tableRowClick(row, index) {
      this.$Message.info(`你双击了第 ${index} 行 百分比是 ${row.percent}`)
    },
    changeTableData() {
      this.datas[0].createUser = `修改表格数据 ${this.count++}`
    },
    changeSearchFresh() {
      this.search.value.descript = `修改搜索数据 ${this.count++}`
      this.$refs.table.fetch()
    },
    searchHandle() {
      this.$refs.table.fetch()
    },
    searchReset() {
      this.$refs.table.searchReset()
    },
    openForm() {
      this.$refs.table.typeAction({
        type: 'new'
      })
    },
    getDatas() {
      const datas = this.$refs.table.getDatas()
      console.log(datas)
      this.$Message.info({
        content: '请打开控制台查看打印数据'
      })
    }
  }
}
</script>

<template>
  <div>
    <div flex items-center>
      <div mr2>搜索相关:</div>
      <div>
        <Button @click="changeSearchFresh" mr2> 修改搜索并刷新表格 </Button>
        <Button @click="searchHandle" mr2> 手动搜索 </Button>
        <Button @click="searchReset"> 手动重置搜索 </Button>
      </div>
    </div>
    <div flex items-center mt-2>
      <div mr2>表格相关:</div>
      <div>
        <Button @click="changeTableData" mr2> 修改表格数据 </Button>
        <Button @click="getDatas"> 获取所有数据 </Button>
      </div>
    </div>
    <div flex items-center mt-2>
      <div mr2>表单相关:</div>
      <div>
        <Button @click="openForm">打开新建表单 </Button>
      </div>
    </div>
    <pro-table ref="table" v-model="datas" v-bind="config" :search="search" />
  </div>
</template>

<route lang="yaml">
meta:
  layout: local
  title: 示例代码
</route>
