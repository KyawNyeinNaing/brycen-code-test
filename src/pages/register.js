import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CheckboxTree from 'react-checkbox-tree'
import { Layout } from '@/src/components'

import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdChevronRight,
  MdKeyboardArrowDown,
  MdAddBox,
  MdIndeterminateCheckBox,
  MdFolder,
  MdFolderOpen,
  MdInsertDriveFile
} from "react-icons/md"
import styled from 'styled-components'

const nodes = [
  {
    value: "A",
    label: "A Process",
    children: [
      {
        value: "A1",
        label: "a1",
        children: [
          {
            value: "A1-1",
            label: "a1.1",
            children: [
              {
                value: "A1-2",
                label: "a1.2"
              }
            ]
          },
          {
            value: "A2-1",
            label: "a2.1"
          }
        ]
      }
    ]
  },
  {
    value: "B",
    label: "B Process",
    children: [
      {
        value: "B1-1",
        label: "b1.1"
      },
      {
        value: "B2-1",
        label: "b2.1"
      }
    ]
  },
  {
    value: "C",
    label: "C Process",
    children: [
      {
        value: "C1-1",
        label: "c1.1"
      },
      {
        value: "C2-1",
        label: "c2.1"
      }
    ]
  }
]

const Register = () => {
  const [checked, setChecked] = useState([])
  const [expanded, setExpanded] = useState([])

  const icons = {
    check: <MdCheckBox className="rct-icon rct-icon-check" />,
    uncheck: <MdCheckBoxOutlineBlank className="rct-icon rct-icon-uncheck" />,
    halfCheck: (
      <MdIndeterminateCheckBox className="rct-icon rct-icon-half-check" />
    ),
    expandClose: (
      <MdChevronRight className="rct-icon rct-icon-expand-close" />
    ),
    expandOpen: (
      <MdKeyboardArrowDown className="rct-icon rct-icon-expand-open" />
    ),
    expandAll: <MdAddBox className="rct-icon rct-icon-expand-all" />,
    collapseAll: (
      <MdIndeterminateCheckBox className="rct-icon rct-icon-collapse-all" />
    ),
    parentClose: <MdFolder className="rct-icon rct-icon-parent-close" />,
    parentOpen: <MdFolderOpen className="rct-icon rct-icon-parent-open" />,
    leaf: <MdInsertDriveFile className="rct-icon rct-icon-leaf-close" />
  }

  const initialValues = {
    name: '',
    email: '',
    custom_check: []
  }

  const onDataSubmit = (values, actions) => {
    console.log(values)
    setTimeout(async () => {
      try {
        // alert(JSON.stringify(values))
        actions.setSubmitting(false)
      } catch (error) {
        console.log('error', error)
      }
    }, 1000)
  }

  return (
    <Layout title='Register'>
      <RegisterWrap>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values, actions) => onDataSubmit(values, actions)}>
          {
            formikProps => (
              <Form>
                <div className="form__element">
                  <label
                    htmlFor='name'
                    className='label'
                  >
                    User Name
                  </label>
                  <input id='name' className='input' type="text" name='name' />
                </div>

                <div className="form__element">
                  <label
                    htmlFor='email'
                    className='label'
                  >
                    Email
                  </label>
                  <input id='email' className='input' type="email" name='email' />
                </div>

                <CheckboxTree
                  id='custom_check'
                  name='custom_check'
                  nodes={nodes}
                  checked={checked}
                  expanded={expanded}
                  onCheck={checked => setChecked(checked)}
                  onExpand={expanded => setExpanded(expanded)}
                  icons={icons}
                  value='custome_check'
                  onChange={e => {
                    formikProps?.setFieldValue('custome_check', [...formikProps?.values?.custom_check, e?.target?.value])
                  }}
                />

                <button className='btn btn__primary' type='submit'>Save</button>
              </Form>
            )
          }
        </Formik>
      </RegisterWrap>
    </Layout>
  )
}

export default Register

const RegisterWrap = styled.div`
  width: 40%;
  margin: 0 auto;
  padding: 25px;
`