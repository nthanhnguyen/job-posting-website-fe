import { useEffect, useRef, useState } from 'react';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import NotFound from 'components/share/not.found';
import Loading from 'components/share/loading';
import LoginPage from 'pages/auth/login';
import LayoutAdmin from 'components/admin/layout.admin';
import ProtectedRoute from 'components/share/protected-route.ts';
import Header from 'components/client/header.client';
import Footer from 'components/client/footer.client';
import HomePage from 'pages/home';
import styles from 'styles/app.module.scss';
import DashboardPage from './pages/admin/dashboard';
import CompanyPage from './pages/admin/company';
import PermissionPage from './pages/admin/permission';
import ResumePage from './pages/admin/resume';
import RolePage from './pages/admin/role';
import UserPage from './pages/admin/user';
import { fetchAccount } from './redux/slice/accountSlide';
import LayoutApp from './components/share/layout.app';
import JobPage from './pages/admin/job';
import ViewUpsertJob from './components/admin/job/upsert.job';
import ClientJobPage from './pages/job';
import ClientJobDetailPage from './pages/job/detail';
import ClientCompanyPage from './pages/company';
import ClientCompanyDetailPage from './pages/company/detail';
import ResumeBuilderPage from './pages/resume-builder';
import EditResume from './pages/resume-builder/resume/[resumeId]/edit';
import { Toaster } from './components/ui/sonner';
import ViewResume from './pages/my-resume/[resumeId]/view';
import LoginIsRequired from './components/share/login-required';
import SendMailPage from './pages/auth/register/SendMail';
import ActivatePage from './pages/auth/register/activation';
import RegisterPage from './pages/auth/register/page';
import BlogDetail from './pages/blog/detail';
import EmployerPage from './pages/employer/detail';
import LayoutEmployer from './components/hr/layout.employer';
import CompanyPageForHr from './pages/hr/company';
import JobPageForHr from './pages/hr/job';
import ResumePageForHr from './pages/hr/resume';
import ViewUpsertJobForHr from './components/hr/job/upsert.job';
import ClientSubscriberJobPage from './pages/job/subscriber.job';

const LayoutClient = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef && rootRef.current) {
      rootRef.current.scrollIntoView({ behavior: 'smooth' });
    }

  }, [location]);

  return (
    <div className='layout-app' ref={rootRef}>
      <div id="no-print">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <div className={styles['content-app']}>
        <Outlet context={[searchTerm, setSearchTerm]} />
      </div>
      <div id="no-print">
        <Footer />
      </div>
    </div>
  )
}

export default function App() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.account.isLoading);


  useEffect(() => {
    if (
      window.location.pathname === '/login'
      || window.location.pathname === '/register'
      || window.location.pathname === '/activation/:token'
    )
      return;
    dispatch(fetchAccount())
  }, [])

  const user = useAppSelector(state => state.account.user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (<LayoutApp><LayoutClient /></LayoutApp>),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "job", element: <ClientJobPage /> },
        {
          path: "subscriber-job", element:
            <LoginIsRequired>
              <ClientSubscriberJobPage />
            </LoginIsRequired>
        },
        { path: "job/:id", element: <ClientJobDetailPage /> },
        { path: "company", element: <ClientCompanyPage /> },
        { path: "company/:id", element: <ClientCompanyDetailPage /> },
        { path: "resume-builder", element: <LoginIsRequired> <ResumeBuilderPage /> </LoginIsRequired> },
        { path: "/resume-builder/resume/:resumeId/edit", element: <LoginIsRequired> <EditResume /> </LoginIsRequired> },
        { path: "/my-resume/:resumeId/view", element: <ViewResume /> },
        { path: "/employer-contact", element: <EmployerPage /> },
        { path: "/blog", element: <BlogDetail /> },
      ],
    },

    {
      path: "/admin",
      // element: (<LayoutApp><LayoutAdmin /> </LayoutApp>),
      element: (
        <>
          {isLoading === true ?
            <Loading />
            :
            <LayoutApp>
              {user?.role.name === 'SUPER_ADMIN' ? <LayoutAdmin /> : <NotFound />}
            </LayoutApp>
          }
        </>

      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
        },
        {
          path: "company",
          element:
            <ProtectedRoute>
              <CompanyPage />
            </ProtectedRoute>
        },
        {
          path: "user",
          element:
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
        },

        {
          path: "job",
          children: [
            {
              index: true,
              element: <ProtectedRoute> <JobPage /></ProtectedRoute>
            },
            {
              path: "upsert", element:
                <ProtectedRoute><ViewUpsertJob /></ProtectedRoute>
            }
          ]
        },

        {
          path: "resume",
          element:
            <ProtectedRoute>
              <ResumePage />
            </ProtectedRoute>
        },
        {
          path: "permission",
          element:
            <ProtectedRoute>
              <PermissionPage />
            </ProtectedRoute>
        },
        {
          path: "role",
          element:
            <ProtectedRoute>
              <RolePage />
            </ProtectedRoute>
        }
      ],
    },

    {
      path: "/employer",
      // element: (<LayoutApp><LayoutAdmin /> </LayoutApp>),
      element: (
        <>
          {isLoading === true ?
            <Loading />
            :
            <LayoutApp>
              {user?.role.name === 'HR' ? <LayoutEmployer /> : <NotFound />}
            </LayoutApp>
          }
        </>
      ),
      errorElement: <NotFound />,
      children: [
        {
          index: true, element:
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
        },
        // {
        //   path: "company",
        //   element:
        //     <ProtectedRoute>
        //       <CompanyPageForHr />
        //     </ProtectedRoute>
        // },
        {
          path: "job",
          children: [
            {
              index: true,
              element: <ProtectedRoute> <JobPageForHr /></ProtectedRoute>
            },
            {
              path: "upsert", element:
                <ProtectedRoute><ViewUpsertJobForHr /></ProtectedRoute>
            }
          ]
        },

        {
          path: "resume",
          element:
            <ProtectedRoute>
              <ResumePageForHr />
            </ProtectedRoute>
        },
      ],
    },

    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/register/send-mail",
      element: <SendMailPage />,
    },
    {
      path: "/activation/:token",
      element: <ActivatePage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}