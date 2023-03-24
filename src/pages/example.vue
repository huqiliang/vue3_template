<script lang="jsx">
export default {
  name: 'Example',
  data() {
    return {
      pageSize: 30,
      count: 0,
      hide: { table: false },
      toolBarActions: [
        'new',
        {
          key: 'test',
          renderItem() {
            return (
              <Button
                type="primary"
                onclick={() => {
                  console.log('自定义按钮')
                }}
              >
                编辑
              </Button>
            )
          },
        },
        'refresh',
        'rowSetting',
      ],
      search: { searchLineNum: 3, value: { createUser3: 'gg' } },
      form: {
        labelPosition: 'right',
        formLineNum: 3,
        modalWidth: 70,
        value: { createUser10: 'gg' },
      },
      datas: [],
      cascader_data: [
        {
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫',
            },
            {
              value: 'tiantan',
              label: '天坛',
            },
            {
              value: 'wangfujing',
              label: '王府井',
            },
          ],
        },
      ],
      toolBar: true,
      autoData: {
        columns: [
          {
            title: '标题',
            key: 'toolBar',
            type: 'radio',
            props: {
              value: true,
            },
          },
        ],
        value: {
          toolBar: false,
        },
      },
      format: {
        // formatCurrent({ page }) {
        //   const { current, pageSize } = page;
        //   return { ...page, current: (current - 1) * pageSize };
        // }
        formatCurrent: '(page.current - 1) * page.pageSize',
      },
      columns: [
        {
          title: '是否',
          group: 'B',
          key: 'cataLog',
          disabled: true,
          renderSearch: {
            type: 'Radio',
          },
          renderForm: {
            type: 'DatePicker',
            props: {
              placeholder: 'lastDate',
              format: 'yyyy-MM-dd hh:mm:ss',
            },
            format(value) {
              return value ? dayjs(value).format('YYYY-MM-DD hh:mm:ss') : ''
            },
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
          },
        },
        {
          title: '创建人',
          key: 'createUser',
          renderSearch: ({ value, input }) => {
            return (
              <Select value={value} oninput={input} clearable>
                <Option value="1">1</Option>
              </Select>
            )
          },
        },
        {
          title: '长度',
          disabled: true,
          renderSearch: {
            type: 'Slider',
          },
          renderForm: {
            type: 'DatePicker',
            style: {
              width: '100%',
            },
          },
          renderTable: (h, params) => {
            return <span>{params.row.isAllow === 'F' ? '黑名单' : '白名单'}</span>
          },
          key: 'createUser2',
        },
        {
          title: '数字',
          renderSearch: {
            type: 'InputNumber',
          },
          renderForm: {
            type: 'i-switch',
          },
          key: 'createUser8',
        },
        {
          title: '城市',
          notShowTable: true,
          renderForm: {
            type: 'Select',
            children: [],
          },
          renderSearch: ({ value, input }) => {
            return <Cascader value={value || []} onInput={input} data={this.cascader_data} clearable></Cascader>
          },
          key: 'createUser4',
        },
        {
          title: 'creat4',
          notShowTable: true,
          notShowSearch: true,
          rules: [
            {
              required: true,
              message: 'creat4不能为空',
            },
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
                      label: '故宫',
                    },
                    {
                      value: 'tiantan',
                      label: '天坛',
                    },
                    {
                      value: 'wangfujing',
                      label: '王府井',
                    },
                  ],
                },
              ],
            },
          },
          key: 'createUs3er4',
        },
        {
          title: '关键字',
          tooltip: true,
          tooltipMaxWidth: 700,
          key: 'descript',
          renderTable: {
            type: 'span',
            useExp: true,
            text: 'value===200?\'成功\':\'失败\';console.log(value);',
            style: {
              color: 'value==200?\'#19be6b\':\'#ed4014\'',
            },
          },
          renderForm: {
            type: 'i-input',
            props: {
              type: 'textarea',
              rows: 4,
            },
          },
          // renderForm() {
          //   return (
          //     <Input
          //       maxlength="100"
          //       show-word-limit
          //       type="textarea"
          //       placeholder="Enter something..."
          //       rows={4}
          //     />
          //   );
          // },
          formLineNum: 2,
        },
        {
          title: '百分比',
          key: 'percent',
          notShowSearch: true,
          renderTable({ row }) {
            console.log(row)
            return (
              <div class="p-5">
                <Circle percent={row.percent} size={80}>
                  <span class="demo-Circle-inner" style="font-size:14px">
                    {row.percent}%
                  </span>
                </Circle>
              </div>
            )
          },
        },
        {
          title: '操作',
          key: 'action',
          actions: [
            {
              type: 'edit',
              title: '编辑2',
              request: '/api/users/${cataLog}',
              method: 'PUT',
            },
            {
              title: '新增',
              type: 'new',
            },
            {
              title: '测试',
              action(params) {
                console.log('====================================')
                console.log(params)
                console.log('====================================')
              },
            },
            {
              title: '编辑',
              method: 'POST',
              type: 'edit',
              request: 'http://192.168.0.38:3000/mock/106/api/test',
              // request(options) {
              //   console.log(options);
              //   return axios.post(
              //     "http://192.168.0.38:3000/mock/67/sys/sysOptionList",
              //     {
              //       a: options.row.cateLog
              //     }
              //   );
              // }
            },
            {
              type: 'delete',
              title: '删除',
              request: 'http://127.0.0.1:7068/api/v1/users/${id}',
              method: 'DELETE',
            },
            // {
            //   title: "删除",
            //   type: "delete",
            //   // method: "delete",
            //   // request: "/id",
            //   keys: ["id"]
            // }
          ],
        },
      ],
      request: 'http://192.168.0.38:3000/mock/106/api/table',
      // request(options) {
      //   // console.log(options);
      //   return axios.get("http://192.168.0.38:3000/mock/106/api/table", {
      //     headers: {
      //       nomsg: true
      //     },
      //     params: { ...options }
      //   });
      // },
      map: {
        dataPath: 'data',
        totalPath: 'totalRows',
        message: 'message',
      },
      submitForm: 'http://192.168.0.38:3000/mock/106/api/test',
    }
  },
  async mounted() {
    // const res = await this.$http.get(
    //   "http://192.168.0.38:3000/mock/106/api/table",
    //   {
    //     headers: {
    //       nomsg: true
    //     }
    //   }
    // );
    // console.log(this.columns[5]);
    // console.log("====================================");
    // this.columns[5].renderForm.children = [
    //   {
    //     type: "i-option",
    //     props: {
    //       value: "aa",
    //       label: "New York"
    //     }
    //   }
    // ];
    // this.$success(res);
  },
  methods: {
    searchReset(data) {},
    tableAction() {
      console.log('table click')
    },
    changeTableData() {
      this.datas[0].createUser = `修改数据 ${this.count++}`
    },
    changeSearchFresh() {
      this.search.value.createUser3 = '123'
      this.$refs.table.fetch()
      // this.toolBar = false;
      // this.$set(this.data, 0, {
      //   createUser: 'aa',
      // })
    },
    table() {
      const ref = this.$refs.proSearch
      console.log(ref.value)
    },
  },
}
</script>

<template>
  <div>
    <div flex items-center>
      <div mr2>
        搜索相关:
      </div>
      <div>
        <Button @click="changeSearchFresh">
          修改搜索数据并刷新表格
        </Button>
      </div>
    </div>
    <div flex items-center mt-2>
      <div mr2>
        表格相关:
      </div>
      <div>
        <Button @click="changeTableData">
          修改表格数据
        </Button>
      </div>
    </div>
    <pro-table
      ref="table"
      v-model="datas"
      :request="request"
      :map="map"
      :tool-bar="toolBar"
      :columns="columns"
      :search="search"
      :submit-form="submitForm"
      :format="format"
      :form="form"
      :auto-fetch="true"
      :hide="hide"
      :tool-bar-actions="toolBarActions"
      :page-size="pageSize"
      @search-reset="searchReset"
      @on-row-click="tableAction"
    />

    <!-- <pro-table :columns="columns" :searchLineNum="5"> </pro-table> -->
  </div>
</template>

// 自动路由相关的信息可以在这里填写
<route lang="yaml">
meta:
  layout: local
  title: 示例代码
</route>
