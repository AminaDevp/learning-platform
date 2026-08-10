import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusIcon, UserPlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";
import { MOCK_COURSES } from "../../utils/mockCourses";
import Input from "../../component/common/Input";
import Button from "../../component/common/Button";

export default function AdminCourses() {
  const { department } = useAuth(); // "برمجة" | "إنجليزي" | "الكل"
  const isSuperAdmin = department === "الكل";

  const [courses, setCourses] = useState(MOCK_COURSES);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: "", description: "", category: department });
  const [assigningTo, setAssigningTo] = useState(null); // id الكورس اللي فاتح فيه نموذج تعيين مدرس
  const [newInstructor, setNewInstructor] = useState({ name: "", price: "" });

  const visibleCourses = isSuperAdmin
    ? courses
    : courses.filter((c) => c.category === department);

  const handleAddCourse = (e) => {
    e.preventDefault();
    // TODO: استبدال بـ POST /api/admin/courses حقيقي
    const course = {
      id: Date.now(),
      title: newCourse.title,
      description: newCourse.description,
      category: isSuperAdmin ? newCourse.category : department,
      instructors: [],
    };
    setCourses((prev) => [course, ...prev]);
    setNewCourse({ title: "", description: "", category: department });
    setShowAddCourse(false);
  };

  const handleAssignInstructor = (courseId) => {
    if (!newInstructor.name || !newInstructor.price) return;
    // TODO: استبدال بـ POST /api/admin/courses/:id/instructors حقيقي
    // (الأصح: اختيار مدرس من قائمة المدرسين المعتمدين بدل كتابة اسم يدوي —
    // مؤقتاً بسيط لحد ما تجهز قائمة المدرسين الحقيقية من الـ Backend)
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? {
              ...c,
              instructors: [
                ...c.instructors,
                { id: Date.now(), name: newInstructor.name, price: `${newInstructor.price} د.ت`, rating: 0, days: [] },
              ],
            }
          : c
      )
    );
    setNewInstructor({ name: "", price: "" });
    setAssigningTo(null);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-gray-900">
            إدارة الكورسات {!isSuperAdmin && `— قسم ${department}`}
          </h1>
          <p className="mt-1 text-gray-500">أضف كورسات جديدة وعيّن مدرسين لها.</p>
        </div>
        <Button onClick={() => setShowAddCourse((v) => !v)}>
          <PlusIcon className="h-4 w-4" />
          إضافة كورس
        </Button>
      </div>

      {/* نموذج إضافة كورس */}
      <AnimatePresence>
        {showAddCourse && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAddCourse}
            className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white p-5"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="اسم الكورس"
                name="title"
                required
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
              />
              {isSuperAdmin ? (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">الفئة</label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="برمجة">برمجة</option>
                    <option value="إنجليزي">إنجليزي</option>
                    <option value="مكس">مكس</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">الفئة</label>
                  <p className="rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-500">{department} (ثابتة حسب قسمك)</p>
                </div>
              )}
            </div>

            <Input
              label="الوصف"
              name="description"
              as="textarea"
              rows={3}
              required
              value={newCourse.description}
              onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
              className="mt-4"
            />

            <div className="mt-4 flex gap-2">
              <Button type="submit" size="sm">حفظ الكورس</Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => setShowAddCourse(false)}>
                إلغاء
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* قائمة الكورسات */}
      <div className="mt-8 flex flex-col gap-4">
        {visibleCourses.map((course) => (
          <div key={course.id} className="rounded-2xl border border-gray-100 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-display font-semibold text-gray-900">{course.title}</p>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {course.category}
                  </span>
                </div>
                <p className="mt-1 max-w-md text-sm text-gray-500">{course.description}</p>
              </div>

              <button
                onClick={() => setAssigningTo(assigningTo === course.id ? null : course.id)}
                className="flex items-center gap-1 rounded-lg bg-secondary/10 px-3 py-1.5 text-sm font-medium text-secondary transition hover:bg-secondary hover:text-white"
              >
                <UserPlusIcon className="h-4 w-4" />
                تعيين مدرس
              </button>
            </div>

            {/* المدرسين المعينين حالياً */}
            {course.instructors.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {course.instructors.map((inst) => (
                  <span
                    key={inst.id}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                  >
                    {inst.name} · {inst.price}
                  </span>
                ))}
              </div>
            )}

            {/* نموذج تعيين مدرس مصغّر */}
            <AnimatePresence>
              {assigningTo === course.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 flex items-end gap-2 overflow-hidden border-t border-gray-100 pt-4"
                >
                  <Input
                    label="اسم المدرس"
                    name="instName"
                    value={newInstructor.name}
                    onChange={(e) => setNewInstructor({ ...newInstructor, name: e.target.value })}
                    className="flex-1"
                  />
                  <Input
                    label="السعر (د.ت)"
                    name="instPrice"
                    type="number"
                    value={newInstructor.price}
                    onChange={(e) => setNewInstructor({ ...newInstructor, price: e.target.value })}
                    className="w-32"
                  />
                  <Button size="sm" onClick={() => handleAssignInstructor(course.id)}>
                    إضافة
                  </Button>
                  <button
                    onClick={() => setAssigningTo(null)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}