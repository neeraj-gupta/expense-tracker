import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
} from 'react-icons/lu';

export const SideMenuData = [{
        id: 1,
        title: 'Dashboard',
        icon: LuLayoutDashboard,
        path: '/dashboard',
    },
    {
        id: 2,
        title: 'Income',
        icon: LuHandCoins,
        path: '/income',
    },
    {
        id: 3,
        title: 'Expense',
        icon: LuWalletMinimal,
        path: '/expense',
    },
    {
        id: 4,
        title: 'Logout',
        icon: LuLogOut,
        path: '/logout',
    }
]