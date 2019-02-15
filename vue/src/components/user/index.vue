<template>
    <div>

        <Table border :columns="columns" :data="list"></Table>
        <Page :total="total" show-sizer @on-change="onChangePage"/>
        <Modal v-model="dialog" draggable scrollable title="修改数据">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="姓名" prop="name">
                    <Input v-model="formValidate.name"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="formValidate.password" ></Input>
                </FormItem>
                 <FormItem label="性别" prop="sex">
                    <RadioGroup v-model="formValidate.sex">
                        <Radio label="男">男</Radio>
                        <Radio label="女">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="年龄" prop="age">
                    <Input v-model="formValidate.age" ></Input>
                </FormItem>
                <FormItem label="出生日期">
                    <Row>
                        <Col span="11">
                            <FormItem prop="date">
                                <DatePicker type="date" v-model="formValidate.date"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <FormItem prop="time">
                                <TimePicker type="time"  v-model="formValidate.time"></TimePicker>
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
               
                <FormItem label="地址" prop="address">
                    <Input v-model="formValidate.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
                <FormItem label="薪水" prop="salary">
                    <Input v-model="formValidate.salary" ></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                dialog: false,
                formValidate: {
                    name: '',
                    password: '',
                    sex: '',
                    age: '',
                    date: '',
                    time:'',
                    address: '',
                    salary:''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Password cannot be empty', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    age: [
                        { required: true, message: 'Age cannot be empty', trigger: 'blur' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                    address: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        // { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ],
                    salary: [
                        { required: true, message: 'Salary cannot be empty', trigger: 'blur' }
                    ],
                },
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '密码',
                        key: 'password'
                    },
                     {
                        title: '性别',
                        key: 'sex'
                    },
                     {
                        title: '年龄',
                        key: 'age'
                    },
                    //  {
                    //     title: '电话',
                    //     key: 'tel'
                    // },
                     {
                        title: '出生日期',
                        key: 'birthday'
                    },
                     {
                        title: '地址',
                        key: 'address'
                    },
                    {
                        title: '薪水',
                        key: 'salary'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.row._id)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row._id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                list:[],
                rows: 10,
                total:0,
                page:1
            }
        },
        methods: {
            handleSubmit (name) {
                console.log( this.$refs[name].model);
                var fomate=this.$refs[name].model;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // console.log( this.$Message);
                        // this.$Message.success('Success!');
                         this.axios({
                            url:'http://localhost:3000/users',
                            method:'post',
                            data:fomate
                        }).then(res=>{
                            console.log(res)
                            this.getList();
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            getList(){
                this.axios({
                    url:'http://localhost:3000/users/list',
                    method:'post',
                    data:{
                        rows:this.rows,
                        page:this.page
                    }
                }).then(res=>{
                    // console.log(res.data);
                    this.list=res.data.rows;
                    this.total=res.data.total;
                })
            },
            onChangePage(page){
                this.page=page;
                this.getList();
            },
           edit(id) {
                // this.$Modal.info({
                //     title: '修改数据',
                //     content: {}
                // })
                this.dialog=true;
            },
            remove (id) {
                this.$Modal.confirm({
                    title: '确认删除?',
                    content: '<p>Are you sure?</p>',
                    onOk: () => {
                        this.$Message.info('Clicked ok');
                        this.axios({
                            url:`http://localhost:3000/users/${id}`,
                            method:'delete'
                        }).then(res=>{
                            this.getList();
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
                
            }
        },
        mounted(){
            this.getList();
        }
    }
</script>