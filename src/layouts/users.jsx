import React, { useState, useEffect } from "react";
import SearchStatus from "../components/ui/searchStatus";
import ResetBtn from "../components/ui/resetBtn";
import Pagination from "../components/common/pagination";
import { pagination } from "../utils/paginate";
import GroupList from "../components/common/groupList";
import api from "../api";
import UsersTable from "../components/ui/usersTable";
import _ from "lodash";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [search, setSearch] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [users, setUsers] = useState();

  const handleDelete = (userId) => {
    setUsers(users.filter((v) => v._id !== userId));
  };

  const handleReset = async () => {
    let data = await api.users.fetchAll();
    setUsers(data);
  };

  const handleProfessionSelect = (item) => {
    setSearch("");
    setSelectedProf(item);
  };

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data);
    });
  }, []);

  const pageSize = 4;

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : search
      ? users.filter((user) =>
          user.name.toLowerCase().includes(search.trim().toLowerCase())
        )
      : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersP = pagination(sortedUsers, currentPage, pageSize);

    if (filteredUsers.length / pageSize === currentPage - 1) {
      setCurrentPage(currentPage - 1);
    }

    const bookedHandler = (userId) => {
      const newUsers = users.map((user) => {
        if (user._id === userId) {
          user.booked = !user.booked;
        }
        return user;
      });
      setUsers(newUsers);
    };

    const onHandleReset = () => {
      handleReset();
      setCurrentPage(1);
    };

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    const handleOnSort = (item) => {
      setSortBy(item);
    };

    const handlerSearch = (e) => {
      clearFilter();
      const { target } = e;
      setSearch(target.value);
    };

    const clearFilter = () => {
      setSelectedProf();
    };
    return (
      <div className="d-flex flex-column">
        <div className="p-3">
          <SearchStatus users={count} />
          {count === 0 ? <ResetBtn onHandleReset={onHandleReset} /> : ""}
        </div>
        <div className="d-flex flex-row">
          {professions && (
            <div className="d-flex flex-column flex-shrink-0 p-3 mt-4">
              <GroupList
                selectedItem={selectedProf}
                items={professions}
                onItemSelect={handleProfessionSelect}
              />
              <button
                className={
                  "btn btn-secondary mt-2" + (selectedProf ? "" : " disabled")
                }
                onClick={clearFilter}
              >
                Очистить
              </button>
            </div>
          )}
          <div className="d-flex flex-column p-3">
            <input
              className="form-control"
              type="search"
              placeholder="Search..."
              aria-label="default input example"
              onChange={handlerSearch}
              value={search}
            />
            <UsersTable
              users={usersP}
              handleDelete={handleDelete}
              bookedHandler={bookedHandler}
              handleOnSort={handleOnSort}
              selectedSort={sortBy}
            />
            <div className="d-flex justify-content-center">
              <Pagination
                itemsCount={count}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="d-flex flex-row align-items-center justify-content-center h5 mt-3">
      loading...
    </div>
  );
};

export default Users;
